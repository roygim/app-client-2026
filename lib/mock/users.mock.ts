import { User, UserRole } from "../types";

export const mockUsers: User[] = [
  { id: 1, firstname: 'Alice', lastname: 'Smith', email: 'alice.smith@example.com', role: UserRole.Admin },
  { id: 2, firstname: 'Bob', lastname: 'Johnson', email: 'bob.johnson@example.com', role: UserRole.Regular },
  { id: 3, firstname: 'Carol', lastname: 'Lee', email: 'carol.lee@example.com', role: UserRole.Regular },
];