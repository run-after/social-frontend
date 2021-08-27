# Social - A Facebook Clone

<img src='https://github.com/run-after/blog-frontend/blob/main/src/media/screenshot.png' alt='Blog' width='100%' />

From The Odin Project (https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/odin-book)

- **Built with ReactJS**
- **Custom CSS**
- **Media saved in AWS S3**
- **Deployed on Github Pages**

This is the frontend of a Facebook clone. It makes API calls to the [backend](https://github.com/run-after/social-backend) that was made with Node.js/express.

Utilizing react-router-dom, there is a router that has profile, home, user list, friend list, log in, and sign up.

The user can only access the log in page and sign up page if they are not logged in. Once the user is logged in, they can access everything.

React-facebook-login was used to allow user to create an account, and log into their account via Facebook.

From the login page, the user can either log in with an existing email/password, or log in via Facebook.

From the sign up page, the user can enter in all of their information and create an account, which will be saved in the DB.

The home page is just like the Facebook timeline. The user can see all the posts from their friends and themselves, sorted in order of latest posts. On the home page, there is a form to create a new post. On the timeline, each post can be viewd, liked, and commented on. If the post belongs to the user that is logged in, they can edit it, or delete it. Each post also has a button to view associated comments, as well as a comment creation form. Again, if the user that is signed in is the author of the comment, they can edit/delete that comment. The user can also like/unlike comments.

Each post can consist of a text post, or a photo post. The photos are stored in AWS S3. If the author deletes the photo post, the photo will be deleted from S3.

From the profile page, the user can see all the posts that user has created, sorted in descending order. If the user is viewing their own profile, there is a form to create a new photo/text post. On the timeline, each post can be viewed, liked, and commented on. If the post belongs to the user that is logged in, they can edit it, or delete it. Each post also has a button to view associated comments, as well as a comment creation form. Again, if the user that is signed in is the author of the comment, they can edit/delete that comment. The user can also like/unlike comments. If the current user is viewing their own profile page, they can vieww their friends, delete their account, and change their avatar photo, which is stored in AWS S3.

From the user list page, the user can view all users, send friend requests, accept friend requests, and remove friends. The button changes based on the status of the friendship/friend request.
