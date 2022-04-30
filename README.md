# UiChallengeND

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.3.

First I had to gain a basic understanding about Swagger, then I had to examine the local server, and how it works.

I have built a Single Page Application using **Angular** and **VSCode**. I have used **Bootstrap** CSS library, with the built in classes. I used **Font-awesome** icons.

The page is responsive. The navbar collapses on mobile, and hamburger icon is shown. 

## Navbar

The navbar collapses on mobile, and hamburger-icon is shown. I have imported bootstrap scss files to overwrite built in variable - only for changing navbar background. I think is prettier solution, than using importants and tricking bootstrap.
If logged in, welcome text is shown on navbar. Clicking on user's username takes him/her to the user info page.

## Article Section

I have enforced using 2 submodules for organizing application code. The first modul is Article Modul. **Child-routes** are set. On the landing page we can see the uploaded articles. 

### Article-list

It shows the list of articles (/api/articles). For the article-list-layout I used bootstrap grid system, and I've put bootstrap cards in the grids. In the header we can see the creator, and the number what shows, how many times was the article favorited.
However, it was not part of the exercise, but to make the cards more colorful, I've put **Bill Murray placeholders** into the cards.
We can organize cards related to creation-date, or times it had been favorited.
Clicking on Card header, it shows the article's creator's user profile info. (/api/profiles/{username}).
Clicking anywhere else on the card, it will navigat us to the specific article (/api/articles/{slug}).

### New Article

Clicking on navbar's New Article menu, it navigates us to a form, where a new article can be uploaded. If The user isn't logged in, it shows us a button, which directs us to the login form.
The article has four input field, only "title" and "body" is required to fill.
The article form is validated. 

For the tag-input I used **ngx-chips**. I have never used it before, but is pretty nice, using it required only little JS code.

### Article Component

When clicking a specific article in the article-list page, it directs us to a page where we can read the article. On the top, we can favorite and unfavorite the article (/api/articles/{slug}/favorite).
In the top corner, there is an Edit button, which directs us to a form where we can edit the specified article. For transporting "slug" in the url, and using it for parameter, I used Routes modul, paramMap function and HTTPUrlEncodingCodec. The form is filled with the article's existing data. If editing mode is on, the form-s edit and delete button is visible.
If we arent authorized, we get toaster messages (whith **ngx-toastr**) with the info, we have to log in to favorite and edit.

Under the article there is the comment section. Faded paragraph tells us if we arent logged in, and the input field is disabled. If we are logged in, we are able to write comments (/api/articles/{slug}/comments).
If we are logged in, we can toggle editing the comments. If the little edit icon is clicked, red trash icon shows, and we are able to delete comment.
Clicking on comment's username, it shows us a modal, where users basic data is shown, with profile picture, if uploaded. If logged in, a "Follow/Unfollow" button is shown, to follow/unfollow user (/api/profiles/{username}/follow).

## User Section

In user module we can found the user-related components. Child-routes are set.

### Reg-log component

On the reg-log component we can registrate user and log in user.

Creating the form, I have used Template-driven forms. On the registration panel all the fields are validated on front-end site. Every input field is required. We have to comfirm password. For showing, the data seems good or not, I have used bootstrap classes. Small text fields help users to know what is bad with their data. After sending data, toaster message shows us if it was successful, or not. All the server error messages are shown on front-end site.

After logging in, current user is stored in browser **local storage**. User's token is stored in auth service. **Bearer token is injected in each http request**. 

_I was very happy about this project becouse I have never used authorization before, but it was mandatory to learn it anyways._

### User-info component

If clicked on navbar's username part, we get a form where fields are filled with user's data.
I extended the aplication using **Cloudinary API**. We can upload images, and in response we get the image url. That is saved to user's field. On Cloudinary, I have set a rule. Any uploaded image will be cropped to be square - in order to handle the profile pictures easyly.

### User-list

We can list the registrated users in a table format (/api/users) if we are authorized. We can delete singe users using the "Delete" button (​/api​/users​/{email}).


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

I made simple unit test with dummy services.

_That was the second thing what I started to learn through this project, and it was very exciting. I am grateful to this challenge for teaching me simple unit tests._

###
Hope you like my solution. Thank you for challenging me!

