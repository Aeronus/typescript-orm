export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type HandleRequestProps = {
    uri: string;
    method: HttpMethod;
    options?: { [option: string]: any };
};

export interface HandlerInterface {
    handleRequest(props: HandleRequestProps): Promise<any>;
}
