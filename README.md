README Documentation should include:
A summary of the project


(you may consider recording a video walkthrough of your platform, highlighting key features. Host this video on a free platform (e.g., YouTube) and include a link in your README.)

Clear instructions on how to run the project locally, including setup steps (e.g., installing dependencies and configuring environment variables).


## Welcome to the... Virtual Exhibition Project!

## How to run this project locally

## Installation:
1. Clone the repository in your terminal:
   
  ```sh
   git clone https://github.com/yourusername/project-name.git

2. Navigate to your project:

```sh
cd project-name
```

and open project in code editor.

3. To install local dependencies run the following in your terminal:

```sh
npm install
```

## Create an env file

In this project we are using two different API's to gather museum information. Harvard and Victoria and Albert Museum.

However, for Harvard we need a unique key to use this api, to achieve this do the following...

Visit this link and fill the request form for your unique key

https://docs.google.com/forms/d/e/1FAIpQLSfkmEBqH76HLMMiCC-GPPnhcvHC9aJS86E32dOd0Z8MpY2rvQ/viewform

You should then recieve an email containing this key.

Now in your repo create a file called .env and inside the file add the line:

```sh
API_KEY=your_api_key_here 
```

and replace 'your_api_key_here' with the api key you have been sent.

This securely stores the key. 









