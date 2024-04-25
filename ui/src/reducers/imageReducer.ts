import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
	ImagesStateType,
	VulnerabilityPayload,
	Top3Payload,
	EverythingPayload,
	timePayload,
	savePayload,
	totalVulPayload,
} from '../../ui-types';
import { ImageType } from "../../../types";
import Client from "../models/Client";


const initialState: ImagesStateType = {
	imagesList: [],
  timeStamp: '',
  isSaved: false,
  totalVul: 0,
};


export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async () => {
    const result: ImageType[] = await Client.ImageService.getImages();
    return result;
  }
);

export const imageSlice = createSlice({
	name: 'images',
	initialState,
	reducers: {
		updateVulnerabilities(state, action: PayloadAction<VulnerabilityPayload>) {
			// handle all cases where images are named and tagged <none>:<none> before moving on to handle active images
			if (action.payload.scanName === '<none>:<none>') {
				state.imagesList.forEach((imageObj) => {
					if (imageObj.ScanName === action.payload.scanName) {
						imageObj.Vulnerabilities = action.payload.vulnerabilityObj;
					}
				});
			} else {
				const matchedImg = state.imagesList.find(
					(imageObj) => imageObj.ScanName === action.payload.scanName
				);
				matchedImg.Vulnerabilities = action.payload.vulnerabilityObj;
			}
		},
		deleteImage(state, action: PayloadAction<string>) {
			// find the index of the image object with the action.payload
			const imageIndex = state.imagesList.findIndex(
				(imageObj) => imageObj.ID === action.payload
			);
			// splice the store.imageList at the found index, delete 1, insert nothing
			state.imagesList.splice(imageIndex, 1);
		},
		updateTop3(state, action: PayloadAction<Top3Payload>) {
			if (action.payload.scanName === '<none>:<none>') {
				state.imagesList.forEach((imageObj) => {
					if (imageObj.ScanName === action.payload.scanName) {
						imageObj.Top3Obj = action.payload.top3Obj;
					}
				});
			} else {
				const matchedImg = state.imagesList.find(
					(imageObj) => imageObj.ScanName === action.payload.scanName
				);
				matchedImg.Top3Obj = action.payload.top3Obj;
			}
		},
		addEverything(state, action: PayloadAction<EverythingPayload>) {
			if (action.payload.scanName === '<none>:<none>') {
				state.imagesList.forEach((imageObj) => {
					if (imageObj.ScanName === action.payload.scanName) {
						imageObj.Everything = action.payload.everything;
					}
				});
			} else {
				const matchedImg = state.imagesList.find(
					(imageObj) => imageObj.ScanName === action.payload.scanName
				);
				matchedImg.Everything = action.payload.everything;
			}
		},
		resetImageProperties(state) {
			state.imagesList = state.imagesList.map((image) => ({
				...image,
				Vulnerabilities: undefined,
				Top3Obj: undefined,
				Everything: undefined,
      }));
      state.totalVul = 0;
      state.isSaved = false;
		},
		updateTime(state, action: PayloadAction<timePayload>) {
			state.timeStamp = action.payload.timeStamp;
		},
		updateIsSaved(state, action: PayloadAction<savePayload>) {
			state.isSaved = action.payload.isSaved;
		},
		updateTotalVul(state, action: PayloadAction<totalVulPayload>) {
			state.totalVul = action.payload.totalVul;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchImages.fulfilled, (state, action) => {
			state.imagesList = action.payload;
		});
	},
});

export const {
	updateVulnerabilities,
	deleteImage,
	updateTop3,
	addEverything,
	resetImageProperties,
	updateTime,
	updateIsSaved,
	updateTotalVul,
} = imageSlice.actions;
export default imageSlice.reducer;
