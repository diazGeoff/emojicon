import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WebcamImage } from 'ngx-webcam';
import { VisionAPIService } from './services/vision/vision.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	private trigger: Subject<void> = new Subject<void>();
	trigger$ = this.trigger.asObservable();
	iteratableKeys: Array<string> = [
		"joyLikelihood",
		"sorrowLikelihood",
		"angerLikelihood",
		"surpriseLikelihood"
	];
	score: any = {}

	constructor(
		private _vision: VisionAPIService
	) { }

	reset() {
		this.score = {
			UNKNOWN: [],
			VERY_UNLIKELY: [],
			UNLIKELY: [],
			POSSIBLE: [],
			LIKELY: [],
			VERY_LIKELY: []
		}
	}

	handleImage(img: WebcamImage) {
		this.reset();
		let subscription = this._vision.getVision(img.imageAsBase64)
			.subscribe((result: any) => {
				this.analyzer(result.responses[0]);
				subscription.unsubscribe();
			});
	}

	analyzer(response: any) {
		let faceAnnotation = response.faceAnnotations[0];
		if (!faceAnnotation) return alert("Wala ko kasabot sa imong dagway");
		// console.log(faceAnnotation);
		this.iteratableKeys.forEach(key => {
			let value = faceAnnotation[key];
			this.score[value].push(key);
		});

		this.emojicon();
	}

	emojicon() {
		if (this.score.VERY_LIKELY.length == 1) {
			console.log(this.score.VERY_LIKELY[0]);
		} else if (this.score.VERY_LIKELY.length > 1) {
			console.log("UNKNOWN");
		}else if (this.score.LIKELY.length == 1) {
			console.log(this.score.LIKELY[0]);
		} else if (this.score.LIKELY.length > 1) {
			console.log("UNKNOWN");
		} else if (this.score.POSSIBLE.length == 1) {
			console.log(this.score.POSSIBLE[0]);
		} else if (this.score.POSSIBLE.length > 1) {
			console.log("UNKNOWN");
		} else if (this.score.UNLIKELY.length == 1) {
			console.log(this.score.UNLIKELY[0]);
		} else if (this.score.UNLIKELY.length > 1) {
			console.log("UNKNOWN");
		} else {
			console.log("MEEE")
		}
	}

	capturePhoto() {
		this.trigger.next();
	}
}
