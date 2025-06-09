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