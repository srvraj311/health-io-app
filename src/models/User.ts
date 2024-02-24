export interface User {
    id: string;
    first_name: string; // Use consistent camelCase naming for clarity
    last_name: string;
    mobile_num: string;
    email: string;
    password: string;
    age?: string | number; // Optional, could be either string or number
    role?: string; // Optional
    gender?: string; // Optional
    dob?: string; // Optional
    address?: string; // Optional
    city?: string; // Optional
    state?: string; // Optional
    country?: string; // Optional
    pincode?: string; // Optional
    blood_group?: string; // Optional
}