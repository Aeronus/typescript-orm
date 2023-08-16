export type HandleRequestProps = {
    uri: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    options?: { [option: string]: any };
};

export interface HandlerInterface {
    handleRequest(options: HandleRequestProps): Promise<any>;
}
