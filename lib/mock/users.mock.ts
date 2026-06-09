import { User, UserRole } from "../types";

export const mockUsers: User[] = [
  { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', role: UserRole.Admin },
  { id: 2, firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', role: UserRole.Regular },
  { id: 3, firstName: 'Carol', lastName: 'Lee', email: 'carol.lee@example.com', role: UserRole.Regular },
];