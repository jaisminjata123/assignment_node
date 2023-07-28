# assignment_node

# identifier
Bitespeed needs a way to identify and keep track of a customer's identity across multiple purchases. We know that orders on FluxKart.com will always have either an **`email`** or **`phoneNumber`** in the checkout event.
Bitespeed keeps track of the collected contact information in a relational database table named **`Contact`.**

## Technologies Used

- [Node](https://nodejs.org/)
- [Express](http://expressjs.com/)
- [Socket.io](http://socket.io/)
- [Mysql](https://www.mysql.com/)

## Development Process
### Install Dependencies
 * [Node](https://nodejs.org/en/download/)
```sh
sudo apt install nodejs
```
 
### Run locally
- Browse to the project directory and run the server script. 
```sh
npm start
```
### Local deployment
While node is running, visit the locall!

### Port

http://localhost:8082/api/customer/identify

### Request Body - POST
{
	"email"?: string,
	"phoneNumber"?: number
}



