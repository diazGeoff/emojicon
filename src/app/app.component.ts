import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WebcamImage } from 'ngx-webcam';
import { VisionAPIService } from './services/vision/vision.service';

declare var Howl;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	howler$ = new Howl({
		src: ["assets/audio/notify.mp3"]
	});
	title = 'app';
	loading: boolean = false;
	private trigger: Subject<void> = new Subject<void>();
	trigger$ = this.trigger.asObservable();
	iteratableKeys: Array<string> = [
		"joyLikelihood",
		"sorrowLikelihood",
		"angerLikelihood",
		"surpriseLikelihood"
	];
	score: any = {};
	showEmoji: any = {};

	constructor(
		private _vision: VisionAPIService
	) { }

	ngOnInit() {
		this.reset();
	}

	reset() {
		this.score = {
			UNKNOWN: [],
			VERY_UNLIKELY: [],
			UNLIKELY: [],
			POSSIBLE: [],
			LIKELY: [],
			VERY_LIKELY: []
		}

		this.showEmoji = {
			joyLikelihood: false,
			sorrowLikelihood: false,
			angerLikelihood: false,
			surpriseLikelihood: false,
			meee: false
		}
	}

	handleImage(img: WebcamImage) {
		this.reset();
		this.loading = true;
		let subscription = this._vision.getVision(img.imageAsBase64)
			.subscribe((result: any) => {
				this.analyzer(result.responses[0]);
				subscription.unsubscribe();
			}, (err) => {
				this.loading = false;
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
		this.loading = false;
		this.howl();
		if (this.score.VERY_LIKELY.length == 1) {
			this.showEmojiView(this.score.VERY_LIKELY[0]);
		} else if (this.score.VERY_LIKELY.length > 1) {
			console.log("UNKNOWN");
		}else if (this.score.LIKELY.length == 1) {
			this.showEmojiView(this.score.LIKELY[0]);
		} else if (this.score.LIKELY.length > 1) {
			console.log("UNKNOWN");
		} else if (this.score.POSSIBLE.length == 1) {
			this.showEmojiView(this.score.POSSIBLE[0]);
		} else if (this.score.POSSIBLE.length > 1) {
			console.log("UNKNOWN");
		} else if (this.score.UNLIKELY.length == 1) {
			this.showEmojiView(this.score.UNLIKELY[0]);
		} else if (this.score.UNLIKELY.length > 1) {
			console.log("UNKNOWN");
		} else {
			this.showEmojiView("meee")
		}
	}

	howl() {
		this.howler$.play();
	}

	showEmojiView(status: string) {
		this.showEmoji[status] = true;
	}

	capturePhoto() {
		this.trigger.next();
	}
}
