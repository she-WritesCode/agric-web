export interface CreateUserParam {
    username:           string;
    email:              string;
    provider:           string;
    password:           string;
    resetPasswordToken: string;
    confirmationToken:  string;
    confirmed:          boolean;
    blocked:            boolean;
    role:               string;
    order:              string;
    firstname:          string;
    lastname:           string;
    phone:              string;
    created_by:         string;
    updated_by:         string;
}

export interface User {
    id:        string;
    username:  string;
    email:     string;
    provider:  string;
    confirmed: boolean;
    blocked:   boolean;
    role:      Role;
    order:     Order[];
    firstname: string;
    lastname:  string;
    phone:     string;
}

export interface Order {
    id:             string;
    orderNumber:    string;
    user:           string;
    status:         string;
    order_products: string[];
    payment:        string;
    created_by:     string;
    updated_by:     string;
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