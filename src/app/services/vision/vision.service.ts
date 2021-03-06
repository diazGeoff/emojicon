import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class VisionAPIService {

    private cloudVisionUrl: string = "https://vision.googleapis.com/v1/images:annotate";
    private apiKey: string = "AIzaSyA4qWTNqu3-lE5jzaz3X7rvJWys_rnn5wg";

    constructor(
        private _http: HttpClient
    ) {}

    getVision(imageString: string) {
        let requestData = {
            requests: [
                {
                    image: {
                        content: imageString
                    },
                    features: [
                        {
                            type: "FACE_DETECTION",
                            maxResults: 1
                        }
                    ]
                }
            ]
        };

        return this._http.post(`${this.cloudVisionUrl}?key=${this.apiKey}`, requestData);
    }

}