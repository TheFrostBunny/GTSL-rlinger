import { useEffect, useState } from "react";
import type { DemoStudent } from "./types";
import { getStudentById, updateStudent } from "./localDb";

const DEFAULT_STUDENT_ID = "demo-1";

export function useDemoStudent(studentId: string = DEFAULT_STUDENT_ID) {
  const [student, setStudent] = useState<DemoStudent | undefined>(
    () => getStudentById(studentId),
  );

  useEffect(() => {
    setStudent(getStudentById(studentId));
  }, [studentId]);

  const save = (updated: DemoStudent) => {
    const saved = updateStudent(updated);
    setStudent(saved);
    return saved;
  };

  return { student, saveStudent: save };
}