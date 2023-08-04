export type Serializable = {
    // Define the properties and their types that should be serializable
    [key: string]: string | number | boolean | null | Serializable;
};