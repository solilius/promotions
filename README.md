# Promotions
Scroll to the infinity and manage your totally real promotions.

#### Table of Contents

  * [Abilities](#abilities)
  * [Installation](#installation)
  * [Deployment](#deployment)
  * [How To Use](#how-to-use)
  
  
## Abilities
  * Scroll as much as you want
  * Duplicate cool promotions
  * Edit to make them awesome or
  * Delete lousy ones


##### In Development
  * Minor UI fixes.

<br/>


## Installation
* Clone the repository
* Navigate to folder and Install lerna   ``` $ yarn add lerna -W```
* Run the command: ``` $ yarn bootstrap``` to install all the dependencies.
* Go to `/packages/server` and create **.env** file. in fill it out like this:

```
PORT=3000
MONGO_URI= {ask me personally for that}
```

* Then go to `/packages/client` and create **.env** file. in fill it out like this:

```
PORT=4200
```

<br/>


## Deployment
**Locally**
* just run  ``` $ yarn start``` and it will build and start the server and the client

<br/>

**Heroku Cloud Platform**
 * do it
<br/>
