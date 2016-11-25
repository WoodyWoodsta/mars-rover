![repocover](https://cloud.githubusercontent.com/assets/8268040/20277992/a7f23d1c-aaab-11e6-91e1-944171474fa7.png)

An open Mars Curiosity Rover simulator, intended for modern science education and outreach.

# The Project
This repo includes a CLI for easy installation of all the software components. The project is spread across multiple repos listed below:

- [The Rover Compute Element](https://github.com/WoodyWoodsta/mars-rover-rce)
- [The Robot Visualisation and Sequence Program Server](https://github.com/WoodyWoodsta/mars-rover-rsvp-server)
- [The Robot Visualisation and Sequence Program Client](https://github.com/WoodyWoodsta/mars-rover-rsvp-client)
- [The 3D Models](https://github.com/WoodyWoodsta/mars-rover-models) (designed in SolidWorks)
- [The LaTeX Thesis Writeup](https://github.com/WoodyWoodsta/mars-rover-writeup)

# Installation
The CLI is a Node.js application, so you need to have [node](https://nodejs.org/en/) installed (I prefer [nvm](https://github.com/creationix/nvm) over the standard installer because, you know, it's the way that things are done).

Once node is installed, make sure to have [git](https://git-scm.com/) installed as well as `bower` and `forever` as global packages:

```shell
npm i -g bower forever
```

I also use `yarn` package manager, so you can install that too if you feel like being modern:

```shell
npm i -g yarn
```

Next, install the `mars-rover` CLI:

```shell
npm i -g uct-mars-rover
```

or...

```shell
yarn global add uct-mars-rover
```

Install the mars rover projects by running the following in a desired directory:

```shell
mars-rover install
```

and start and stop the server using:
```shell
mars-rover start-server
```
```shell
mars-rover stop-server
```

Note that for video streaming, `kurento-media-server@6` is required, which only supports Linux operating systems. It can be downloaded from [here](http://doc-kurento.readthedocs.io/en/stable/installation_guide.html) and can be started by running:

```shell
sudo service kurento-media-server-6.x start
```
