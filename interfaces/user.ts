import { Project } from "./project";

export interface CreateUserParam {
    username:           string;
    phone:              string;
    firstname:          string;
    lastname:           string;
    email:              string;
    provider:           string;
    password:           string;
    resetPasswordToken: string;
    confirmationToken:  string;
    confirmed:          boolean;
    blocked:            boolean;
    role:               Role;
    investments:        Partial<InvestmentCreateParam>[];
    created_by:         string;
    updated_by:         string;
}


export interface User {
    id:                 string;
    phone:              string;
    firstname:          string;
    lastname:           string;
    username:           string;
    email:              string;
    provider:           string;
    password:           string;
    resetPasswordToken: string;
    confirmationToken:  string;
    confirmed:          boolean;
    blocked:            boolean;
    role:               Role;
    investments:        Investment[];
    created_by:         Date;
    updated_by:         Date;
}


export interface Investment {
    id:            string;
    project:       Project;
    user:          User;
    quantity:      number;
    status:        string;
    amountPerSlot: number;
    payment:       Payment;
}


export interface InvestmentCreateParam {
    project: Partial<Project>;
    user:           Partial<User>;
    status:         InvestmentStatus;
    payment:        Partial<Payment>;
    quantity: number;
    amountPerSlot: number;
}

export enum InvestmentStatus {
    awaiting_confirmation = "awaiting_confirmation",
    inprogress = "inprogress",
    due = "due",
    paidout = "paidout",
}

export enum PaymentStatus {
    pending = "pending",
    awaitingConfirmation = "awaiting_confirmation",
    confirmed = "confirmed",
    refunded = "refunded",
    failed= "failed",
}

export interface Payment {
    id:         string;
    status:     string;
    reference:  string;
    amountPaid: number;
    investment: Investment;
    created_by: string;
    updated_by: string;
}

export interface PaymentCreateParam {
    status:     PaymentStatus;
    reference:  string;
    amountPaid: number;
    investment:      Investment;
}

export interface Role {
    id:          string;
    name:        string;
    description: string;
    type?:        string;
    permissions?: string[];
    users?:       string[];
    created_by?:  string;
    updated_by?:  string;
}

export interface LoginData {
    jwt:  string;
    user: User;
}