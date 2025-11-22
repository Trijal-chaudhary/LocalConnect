import React, { useRef } from 'react'
import './RatingReview.css'
const RatingReview = ({setReview, handelReview}) => {
  const starRef = useRef();
  const reviewRef = useRef()
  const handelSubmit=(e)=>{
    e.preventDefault();
    const rating = document.querySelector('input[name="rating"]:checked').value;
    handelReview(rating, reviewRef.current.value);
  }
  return (
    <div className='OuterRating'>
      <div class="modal-overlay">
        <div class="modal-content">
            <button class="close-button" onClick={()=>setReview(null)}>&times;</button>
            <div class="modal-header">
                <h2>Leave a Review</h2>
                <p>How was your experience with <strong>Harsh Vardhan</strong>?</p>
            </div>

            <form class="review-form" onSubmit={handelSubmit}>
                
                <div class="rating-stars">
                     
                    <input type="radio" id="star5" name="rating" ref={starRef} value="5" required />
                    <label for="star5" title="5 stars">★</label>
                    <input type="radio" id="star4" name="rating" ref={starRef} value="4" required />
                    <label for="star4" title="4 stars">★</label>
                    <input type="radio" id="star3" name="rating" ref={starRef} value="3" required/> 
                    <label for="star3" title="3 stars">★</label>
                    <input type="radio" id="star2" name="rating" ref={starRef} value="2" required />
                    <label for="star2" title="2 stars">★</label>
                    <input type="radio" id="star1" name="rating" ref={starRef} value="1" required/>
                    <label for="star1" title="1 star">★</label>
                </div>
                <div class="form-group5">
                    <label for="review">Write your review</label>
                    <textarea id="review" name="review" placeholder="Tell us about your experience, what went well, and what could be improved..." ref={reviewRef}></textarea>
                </div>
                
                <button type="submit" class="submit-btn" >Submit Review</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default RatingReview;
