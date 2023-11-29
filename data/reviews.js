import { reviews } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

let exportedMethods = {

    async getAllReviewsByUser (id) {

        id = id.trim();
        
        if (!id || id === null || id === undefined) {
            throw 'You must provide and id'
        };
        
        if (typeof id !== 'string') {
            throw 'ID must be a string'
        };
        
        if (id.length === 0) {
            throw 'ID can not be an empty strings with just spaces'
        };
        
        if (!ObjectId.isValid(id)) {
            throw 'Invalid Object ID'
        };

        const reviewsCollection = await reviews();

        const reviewArray = await reviewsCollection.findOne({_id: new ObjectId(id)}).toArray();

        if (!reviewArray) {
            throw `Was not able to get the reviews for the user with ID: ${id}.`
        };

        return reviewArray || [];
    },

    async createReview (userId, placeId, reviewTitle, rating, reviewDescription) {

        reviewTitle = reviewTitle.trim();
        reviewDescription = reviewDescription.trim();
        userId = userId.trim();
        placeId = placeId.trim();

        if (reviewTitle === null || reviewTitle === undefined ||
            rating === null || rating === undefined ||
            reviewDescription === null || reviewDescription === undefined) {
                throw "All fields must be defined"
            };

        if (reviewTitle === "" || reviewDescription === "") {
            throw "Inputs cannot be empty or empty strings with just spaces"
        };

        if (typeof reviewTitle !== 'string' || typeof reviewDescription !== 'string') {
            throw "Inputs MUST be strings"
        };

        if (typeof rating !== 'number') {
            throw "Rating must be a number!"
        };

        if (rating < 1 || rating > 5) {
            throw "Ratings can only be on a scale from 1 to 5."
        };

        if (!userId || userId === null || userId === undefined) {
            throw "A user ID MUST be provided"
        };

        if (typeof userId !== 'string') {
            throw "User ID MUST be a string"
        };

        if (userId.length === 0) {
            throw "You MUST provide a user ID"
        }

        if (!ObjectId.isValid(userId)) {
            throw 'Invalid Object ID'
        };

        if (!placeId || placeId === null || placeId === undefined) {
            throw "A place ID MUST be provided"
        };

        if (typeof placeId !== 'string') {
            throw "User ID MUST be a string"
        };

        if (placeId.length === 0) {
            throw "You MUST provide a user ID"
        }

        if (!ObjectId.isValid(placeId)) {
            throw 'Invalid Object ID'
        };


        const reviewsCollection = await reviews();

        let reviewObject = {
            userId,
            placeId,
            reviewTitle,
            rating,
            reviewDescription
        };

        const response = await reviewsCollection.insertOne(reviewObject);

        if (!response.acknowledged || !response.insertedId) {
        throw "Failed to insert new data"
        }
        
        const newId = response.insertedId.toString();
    
        const newReview = await reviewsCollection.findOne({_id: new ObjectId(newId)})
    
        return newReview;

    },

    async deleteReview (id) {

        id = id.trim();
        
        if (!id || id === null || id === undefined) {
            throw 'You must provide and id'
        };
        
        if (typeof id !== 'string') {
            throw 'ID must be a string'
        };
        
        if (id.length === 0) {
            throw 'ID can not be an empty strings with just spaces'
        };
        
        if (!ObjectId.isValid(id)) {
            throw 'Invalid Object ID'
        };

        const reviewsCollection = await reviews();

        const findReview = await reviewsCollection.findOne({_id: new ObjectId(id)});

        if(findReview === null) {
        throw `Review with ID: ${id} does not exist in the dataset.`
        };

        const deleteReview = await reviewsCollection.findOneAndDelete({
            _id: new ObjectId(id),
        });

        const review = await reviewsCollection.findOne({_id: new ObjectId(id)})

        if (review === null) {
            return `${deleteReview.reviewTitle} was deleted succesfully`
        } else {
            return `${deleteReview.reviewTitle} was NOT deleted succesfully, please try again.`
        }
    },

    async updateReview (reviewId, reviewTitle, rating, reviewDescription) {

        reviewTitle = reviewTitle.trim();
        reviewDescription = reviewDescription.trim();

        if (reviewTitle === null || reviewTitle === undefined ||
            rating === null || rating === undefined ||
            reviewDescription === null || reviewDescription === undefined) {
                throw "All fields must be defined"
            };

        if (reviewTitle === "" || reviewDescription === "") {
            throw "Inputs cannot be empty or empty strings with just spaces"
        };

        if (typeof reviewTitle !== 'string' || typeof reviewDescription !== 'string') {
            throw "Inputs MUST be strings"
        };

        if (typeof rating !== 'number') {
            throw "Rating must be a number!"
        };

        if (rating < 1 || rating > 5) {
            throw "Ratings can only be on a scale from 1 to 5."
        };

        reviewId = reviewId.trim();
        
        if (!reviewId || reviewId === null || reviewId === undefined) {
            throw 'You must provide and id'
        };
        
        if (typeof reviewId !== 'string') {
            throw 'ID must be a string'
        };
        
        if (reviewId.length === 0) {
            throw 'ID can not be an empty strings with just spaces'
        };
        
        if (!ObjectId.isValid(reviewId)) {
            throw 'Invalid Object ID'
        };

        const reviewsCollection = await reviews();

        const review = await reviewsCollection.findOne({_id: new ObjectId(reviewId)})
  
        if (review === null) {
            throw `No review with ID: ${reviewId}`
        };

        const updatedReview = {
            reviewTitle: reviewTitle,
            rating: rating,
            reviewDescription: reviewDescription
        };

        const updatedInfo = reviewsCollection.findOneAndUpdate(
            {_id: new ObjectId(reviewId)},
            {$set: updatedReview},
            {returnDocument: 'after'}
        );

        if (!updatedInfo) {
            throw 'Were not able to update event successfully.';
        };
        
        return updatedInfo;
        
    },

    async getAllReviewsOfPlace (id) {

        id = id.trim();
        
        if (!id || id === null || id === undefined) {
            throw 'You must provide and id'
        };
        
        if (typeof id !== 'string') {
            throw 'ID must be a string'
        };
        
        if (id.length === 0) {
            throw 'ID can not be an empty strings with just spaces'
        };
        
        if (!ObjectId.isValid(id)) {
            throw 'Invalid Object ID'
        };

        const reviewsCollection = await reviews();

        const reviewArray = await reviewsCollection.findOne({_id: new ObjectId(id)}).toArray();

        if (!reviewArray) {
            throw "Was not able to get the reviews for the place."
        };

        return reviewArray || [];

    },

    async getReviewById (id) {

        id = id.trim();
        
        if (!id || id === null || id === undefined) {
            throw 'You must provide and id'
        };
        
        if (typeof id !== 'string') {
            throw 'ID must be a string'
        };
        
        if (id.length === 0) {
            throw 'ID can not be an empty strings with just spaces'
        };
        
        if (!ObjectId.isValid(id)) {
            throw 'Invalid Object ID'
        };

        const reviewsCollection = await reviews();

        const review = await reviewsCollection.findOne({_id: new ObjectId(id)})
  
        if (review === null) {
        throw `No review with ID: ${id}`
        }
    
        review._id = review._id.toString();

        return review;
    }
};

export default exportedMethods;