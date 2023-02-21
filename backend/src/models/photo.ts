import { InferSchemaType, model, Schema } from 'mongoose';

const photoSchema = new Schema({
	caption: {
		type: String,
		required: true,
	},
	comments: [
		{
			comment: {
				type: String,
				required: true,
			},
			displayName: {
				type: String,
				required: true,
			},
		},
	],
	date: Date(),
	imageSrc: {
		type: String,
		required: true,
	},
	likes: [
		{
			photoId: {
				type: String,
				required: true,
			},
			userId: {
				type: String,
				required: true,
			},
		},
	],
});

type Photo = InferSchemaType<typeof photoSchema>;

export default model<Photo>('Photo', photoSchema);
