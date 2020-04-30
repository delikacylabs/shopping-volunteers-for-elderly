<a  href="https://www.twilio.com">
<img  src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg"  alt="Twilio"  width="250"  />
</a>
 
# Shopping Volunteers for Elderly
 ![SVE](images/theme.jpeg)

## About
Early March, The White House issued specific social distancing guidance for the country that urges older Americans to stay home and to avoid other people. 
The Solution
Introducing: Shopping Volunteers for Elderly (SVE)
Using The Shopping Volunteers application, elderly people submit a request for their shopping needs eg. Grocery, Pharmaceutical needs, etc. Their needs are fulfilled by a network of Volunteers. Volunteers take the necessary precautions and wear a mask all the time when shopping and visiting the Elder Homes. 





### How it works

Shopping Volunteers for Elderly application has a network of volunteers, who work to fulfill the needs of the Elderly people.
The SVE application has 2 interfaces. One, for the Elderly, where they submit their needs. Two, for the Volunteers, where new Volunteers register to SVE.  
During the Volunteer registration process, SVE captures the Zip Code that the volunteer is available to serve. 
Elderly people submits a request for their grocery needs on the SVE website. The application also captures the Zipcode that the person in need belongs to. 
SVE algorithm then matches the volunteers to the Elderly's needs. Each applicable volunteer is notified via Text & Email. 
Once a request is accepted, the request initiator is notified of the action, and a communication stream is opened between the elderly person and the volunteer shopper. 



## Features
There are three google scripts to each of the forms.
Form types:
1. Request form: This is here elderly will make a request.
2. Volunteer form: This is used to store the volunteer information
3. Volunteer to Elderly match form: This is used by volunteer to accept the offer.

## How to use it

These three scripts present in this repo are related to each of the forms.  Follow the following steps for each of them.

1. Tools -> Script Editor
2. Google script will open. 
3. Edit -> Current Project's trigger
4. Click on Add trigger in bottom right corner
5. Select the ffollowing options:
   - Choose which function to run : onSheetUpdate
   - Which runs at deployment : Head
   - Select event source : From spreadsheet
   - Select event type : On form submit

 Please update the link of the document and sheet name in the top of each of the scripts.
 Also, the account sid, auth token and messaging sid needs to be updated.


## Set up

### Requirements

- A Twilio account - [sign up](https://www.twilio.com/try-twilio)
- Google Form
- Google spreadsheet

### Twilio Account Settings

This application should give you a ready-made starting point for writing your
own appointment reminder application. Before we begin, we need to collect
all the config values we need to run the application:

| Config&nbsp;Value | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account&nbsp;Sid  | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| Auth&nbsp;Token   | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| MessagingServiceSid| https://www.twilio.com/console/sms/services |


## Screenshots

 ![Delivery offfer form](images/delivery_offer_form.jpeg)

 ![delivery_request_form](images/delivery_request_form.jpeg)

 ![Volunteer registratoin Form](images/volunteer_registration.jpeg)

 ![Sample volunteer SMS](images/volunteer_sms.jpeg)



## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.
<a  href="https://www.twilio.com">
<img  src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg"  alt="Twilio"  width="250"  />
</a>
 
# Shopping Volunteers for Elderly
 ![SVE](images/theme.jpeg)

## About
Early March, The White House issued specific social distancing guidance for the country that urges older Americans to stay home and to avoid other people. 
The Solution
Introducing: Shopping Volunteers for Elderly (SVE)
Using The Shopping Volunteers application, elderly people submit a request for their shopping needs eg. Grocery, Pharmaceutical needs, etc. Their needs are fulfilled by a network of Volunteers. Volunteers take the necessary precautions and wear a mask all the time when shopping and visiting the Elder Homes. 





### How it works

Shopping Volunteers for Elderly application has a network of volunteers, who work to fulfill the needs of the Elderly people.
The SVE application has 2 interfaces. One, for the Elderly, where they submit their needs. Two, for the Volunteers, where new Volunteers register to SVE.  
During the Volunteer registration process, SVE captures the Zip Code that the volunteer is available to serve. 
Elderly people submits a request for their grocery needs on the SVE website. The application also captures the Zipcode that the person in need belongs to. 
SVE algorithm then matches the volunteers to the Elderly's needs. Each applicable volunteer is notified via Text & Email. 
Once a request is accepted, the request initiator is notified of the action, and a communication stream is opened between the elderly person and the volunteer shopper. 



## Features
There are three google scripts to each of the forms.
Form types:
1. Request form: This is here elderly will make a request.
2. Volunteer form: This is used to store the volunteer information
3. Volunteer to Elderly match form: This is used by volunteer to accept the offer.

## How to use it

These three scripts present in this repo are related to each of the forms.  Follow the following steps for each of them.

1. Tools -> Script Editor
2. Google script will open. 
3. Edit -> Current Project's trigger
4. Click on Add trigger in bottom right corner
5. Select the ffollowing options:
   - Choose which function to run : onSheetUpdate
   - Which runs at deployment : Head
   - Select event source : From spreadsheet
   - Select event type : On form submit

 Please update the link of the document and sheet name in the top of each of the scripts.
 Also, the account sid, auth token and messaging sid needs to be updated.


## Set up

### Requirements

- A Twilio account - [sign up](https://www.twilio.com/try-twilio)
- Google Form
- Google spreadsheet

### Twilio Account Settings

This application should give you a ready-made starting point for writing your
own appointment reminder application. Before we begin, we need to collect
all the config values we need to run the application:

| Config&nbsp;Value | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account&nbsp;Sid  | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| Auth&nbsp;Token   | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| MessagingServiceSid| https://www.twilio.com/console/sms/services |


## Screenshots

 ![Delivery offfer form](images/delivery_offer_form.jpeg)

 ![delivery_request_form](images/delivery_request_form.jpeg)

 ![Volunteer registratoin Form](images/volunteer_registration.jpeg)

 ![Sample volunteer SMS](images/volunteer_sms.jpeg)



## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.
