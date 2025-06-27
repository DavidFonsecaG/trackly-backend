import { Request, RequestHandler, Response } from "express";
import Student from "../models/Student";
import mongoose from "mongoose";

export const createStudent: RequestHandler = async (req: any, res: any) => {
    try {
        const userId = req.user.id
        const {name, email, applicationType, term, program, schedule, status} = req.body.student
        const student = await Student.create({
            userId,
            name,
            email,
            applicationType,
            term,
            program,
            schedule,
            status
        });
        res.status(201).json({
            id: student._id, 
            name: student.name, 
            email: student.email, 
            applicationType: student.applicationType, 
            term: student.term, 
            program: student.program,
            schedule: student.schedule,
            status: student.status,
            lastUpdated: student.updatedAt
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error when creating a student"
        });
    }
};

export const getStudentsByUser = async (req: any, res: any) => {
    try {
        const userId = req.user?.id
        const objectId = mongoose.Types.ObjectId.createFromHexString(userId);
        const students = await Student.find({ userId: objectId })
        if (!students.length) {
            res.status(404).json({ message: "No students associated with this user" });
            return;
        };
        const parsedStudents = students.map(student => ({
            id: student._id, 
            name: student.name, 
            email: student.email, 
            applicationType: student.applicationType, 
            term: student.term, 
            program: student.program,
            schedule: student.schedule,
            status: student.status,
            lastUpdated: student.updatedAt
        }));
        res.status(200).json(parsedStudents);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch students"});
    }
};

export const getStudentById = async () => {

};

export const updateStudent: RequestHandler = async (req: any, res: any) => {
    try {
        const { student } = req.body;

        if (!student?.id) {
        return res.status(400).json({ message: "Student ID is required" });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
        student.id,
        { $set: student },
        { new: true, runValidators: true }
        );

        if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Error when updating a student"
        });
    }
};

export const deleteStudent: RequestHandler = async (req: any, res: any) => {
    try {
        const { studentId } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(studentId)
        if (!deletedStudent) {
            return res.status(404).json({message: "Student not found!"});
        }
        res.status(200).json(deletedStudent);
    } catch (err) {
        res.status(500).json({message: "Error when deleting a student"});
    }
};