To set up db: 


psql
SET ROLE labber;
CREATE DATABASE finals; 
\q
npm run db:reset

------------------

to start server:

cd server 
nodemon

(server should start on port 8080)


-------------------

to start client:

cd client 
npm start 

(client should start on port 3000)



git steps 

git checkout -b "new-feature-branch"
git pull origin main 
 (add some features)
git add .
git commit -m "some explanation"
git push origin "new-feature-branch"

On github, create a pull request by, clicking Pull Requests button, then clicking the new pull request button on the page. Pick your branch, and fill out the form to generate a Pull request.

Anyone on your team can view your pull request
That means anyone can review people's codes. This is a good practice to see how other people are coding, and using different methods.

If you have a merge conflict github will tell you
There are 2 ways to fix it, one way, github will give you the tools ( BAD WAY)
Switch to main/master, pull all the changes, switch back to your branch, MERGE master INTO your branch and fix the conflicts!
Once you fixed them, push the branch back out, and your pull request will be updated.

How to Merge
Scroll down to Merge Pull Request Click the button, Click confirm merge and now everything will be added into your master/main branch.
