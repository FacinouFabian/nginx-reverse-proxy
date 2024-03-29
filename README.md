# nginx-reverse-proxy

First of all, i recommand you to use your owns ssl key and certificate if you need to customize this project. The ones in `reverse-proxy/certs` are just for testing just replace them but make sure to keep the same filenames or change the paths in `conf/nginx.conf`.

![nginx.conf-ssl](conf.PNG)

#### Note

You can check [policies](docker/app/config/policies/permission.js) and [routes](docker/app/api/restaurants/config/routes.json) files and for the rate limiter part.

## installation

You will need to have docker and docker-compose installed (linux) or docker desktop (windows, mac)

## prerequisites

You will need to add a fake domain name on your computer

#### Linux

```bash
sudo nano etc/hosts
```

#### Windows

Open `C:\Windows\System32\drivers\etc` in an editor as an _Administrator_ user

#### Mac OS

[How to modify hosts](https://www.alphr.com/edit-hosts-file-mac-os-x/)

Add the below line to the file

```bash
# Added by <name> for NGINX Reverse Proxy
127.0.0.1 s3ku4pp.com
```

## Usage

Go to the docker directory

```bash
cd docker
```

and run

```bash
docker-compose pull
docker-compose up -d
```

You should have 3 containers running:

- reverse-proxy
- api
- postgres

Then just go at s3ku4pp.com in your browser

You have to create your own admin user to access the strapi leaderboard

Add a new user in the USERS collection and give him the _authenticated_ role

You can also add a new restaurant if you want.

## Using postman

#### Step 1 (get a token)

Go to https://s3ku4pp.com/auth/local using POST method to get a token for your user.
In the body just pass your user's email and password as Application/JSON type

```json
{
  "identifier": "<user_mail>",
  "password": "<user_password>"
}
```

![Screenshot](token.PNG)

Get the jwt value from the server response.

#### Step 2 (request data)

Go to http://s3ku4pp.com/restaurants using GET method.

In the authorization section just pass your bearer token as below

![Screenshot](authorization.PNG)

And yes you have your data in the server's response!

![Screenshot](response.PNG)

Do the same request 10 times and you won't be able to request anymore, wait for 1 minute to request again.

![Screenshot](attempts.PNG)
