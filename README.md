# Local configuration

## To start your local server

* Install ruby version 3.0.1 with

```sh
rbenv install 3.0.1
```

or if you use rvm

```sh
rvm install 3.0.1
```

* Install rails version 7.0.4 with

```sh
gem install rails -v 7.0.4
```

* Use `bundle install` to install Ruby gems

```sh
bundle install
```

You can install `bundler` like this:

```sh
gem install bundler
```

* Install Yarn dependencies with

```sh
yarn install
```

* Create database with

```sh
rails db:create
```

* Run migrations with

```sh
rails db:migrate
```

* Run seeds with

```sh
rails db:seed
```

* Run local server with

```sh
./bin/dev
```
