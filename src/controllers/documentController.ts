import { RequestHandler } from "express";
import StudentDocument from "../models/StudentDocument";
import Student from "../models/Student";
import mongoose from "mongoose";

export const getStudentDocumentsByUser = async (req: any, res: any) => {
    try {
        const ids: string[] = req.body;

        const ownedStudents = await Student.find({ _id: { $in: ids }, userId: req.user.id }).select("_id");
        const ownedIds = ownedStudents.map(s => s._id);

        const studentDocuments = (
            await Promise.all(ownedIds.map(id => StudentDocument.findOne({ studentId: id })))
        ).filter(Boolean);

        const parsedStudentDocuments = studentDocuments.map(sDocuments => ({
            studentId: sDocuments?.studentId,
            documents: sDocuments?.documents,
        }));

        res.status(200).json(parsedStudentDocuments);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch students"});
    }
};

export const createStudentDocument: RequestHandler = async (req: any, res: any) => {
    try {
        const { studentId, studentDocument } = req.body

        const owns = await Student.exists({ _id: studentId, userId: req.user.id });
        if (!owns) {
            return res.status(404).json({ ok: false, message: "Student not found" });
        }

        const createdStudentDocument = await StudentDocument.create({
            studentId: studentId,
            documents: studentDocument.documents
        });
        res.status(201).json(createdStudentDocument)
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error when creating a student document"
        });
    }
};

export const updateStudentDocument: RequestHandler = async (req: any, res: any) => {
  try {
    const { studentId, studentDocument } = req.body;

    if (!studentId || !studentDocument?.documents) {
      return res.status(400).json({
        ok: false,
        message: "Missing studentId or documents",
      });
    }

    const owns = await Student.exists({ _id: studentId, userId: req.user.id });
    if (!owns) {
      return res.status(404).json({ ok: false, message: "Student not found" });
    }

    const updatedDoc = await StudentDocument.findOneAndUpdate(
      { studentId },
      { documents: studentDocument.documents },
      { new: true, upsert: true, runValidators: true }
    );

    return res.status(200).json(updatedDoc);
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Error when updating student document",
    });
  }
};

export const deleteStudentDocument: RequestHandler = async (req: any, res: any) => {
    try {
        const { studentId } = req.params;
        const objectId = mongoose.Types.ObjectId.createFromHexString(studentId);

        const owns = await Student.exists({ _id: objectId, userId: req.user.id });
        if (!owns) {
            return res.status(404).json({message: "Student Document not found!"});
        }

        const deletedStudent = await StudentDocument.findOneAndDelete({studentId: objectId});
        if (!deletedStudent) {
            return res.status(404).json({message: "Student Document not found!"});
        }
        res.status(200).json(deletedStudent);
    } catch (err) {
        res.status(500).json({message: "Error when deleting a student"});
    }
};