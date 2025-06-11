import { Request, RequestHandler, Response } from "express";
import StudentDocument from "../models/StudentDocument";
import mongoose from "mongoose";

export const createStudentDocument: RequestHandler = async (req: any, res: any) => {
    try {
        const { studentId, studentDocument } = req.body
        const createdStudentDocument = await StudentDocument.create({
            studentId: studentId,
            documents: studentDocument.documents
        });
        res.status(201).json({createdStudentDocument})
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error when creating a student document"
        });
    }
};

export const getStudentDocumentsByUser = async (req: any, res: any) => {
    try {
        const ids: string[] = req.body;
        
        const studentSocuments = (
            await Promise.all(ids.map(id => StudentDocument.findOne({ studentId: id })))
        ).filter(Boolean);

        res.status(200).json(studentSocuments);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch students"});
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

    const updatedDoc = await StudentDocument.findOneAndUpdate(
      { studentId },
      { documents: studentDocument.documents },
      { new: true, upsert: true, runValidators: true }
    );

    return res.status(200).json(updatedDoc);
  } catch (err) {
    console.error("Error updating student document:", err);
    return res.status(500).json({
      ok: false,
      message: "Error when updating student document",
    });
  }
};