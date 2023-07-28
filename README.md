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
npm start![WhatsApp Image 2023-07-28 at 17 22 19](https://github.com/jaisminjata123/assignment_node/assets/47449986/99d92799-0ca2-43bd-9cc2-4be30895bf2b)

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
## Screenshots

![pic_1](https://github.com/jaisminjata123/assignment_node/assets/47449986/6cb912ce-b0d3-4be0-838c-4607f105a495)

![pic_2](https://github.com/jaisminjata123/assignment_node/assets/47449986/0e5b658a-0bb9-4f8c-96b4-aef62f947ef5)

