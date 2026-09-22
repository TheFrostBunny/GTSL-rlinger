import seedStudents from "./students.json";
import type { DemoStudent } from "./types";

const STORAGE_KEY = "demo-students";

function loadStudents(): DemoStudent[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedStudents));
    return seedStudents as DemoStudent[];
  }

  try {
    return JSON.parse(raw) as DemoStudent[];
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedStudents));
    return seedStudents as DemoStudent[];
  }
}

function saveStudents(students: DemoStudent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export function getStudentById(id: string): DemoStudent | undefined {
  return loadStudents().find((student) => student.id === id);
}

export function getAllStudents(): DemoStudent[] {
  return loadStudents();
}

export function updateStudent(updated: DemoStudent): DemoStudent {
  const students = loadStudents();
  const index = students.findIndex((s) => s.id === updated.id);

  if (index === -1) {
    students.push(updated);
  } else {
    students[index] = updated;
  }

  saveStudents(students);
  return updated;
}

export function resetStudents(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedStudents));
}