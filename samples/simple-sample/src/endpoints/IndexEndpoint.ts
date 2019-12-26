import Endpoint from '../Endpoint'; 

export default class IndexEndpoint extends Endpoint {
  async Invoke() {
    const response = this.response;

    response.status(200);
    response.write('depenject-express\n');
    response.write('-----------------\n\n');
    response.write(this.url);
    response.end();
  }

  get url() {
    const request = this.request;
    return `${request.protocol}://${request.get('host')}${request.originalUrl}`;
  }
}