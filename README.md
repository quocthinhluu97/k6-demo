<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
        <li><a href="#install">Install</a></li>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

## About The Project
This is a pet project to demo on k6 performance test 

## Install
### k6
Can be installed from the [Official](https://grafana.com/docs/k6/latest/set-up/install-k6/) page

### golang
Can be installed from the [Official](https://go.dev/doc/install) page

### xk6
```
go install go.k6.io/xk6/cmd/xk6@latest
```

### Build k6 executable file with exentions
On Windows:
```
.\src\xk6_build_extensions.bat
```

### k6pack
Precompiled binaries can be downloaded and installed from the [Releases](https://github.com/grafana/k6pack/releases) page.

If you have a go development environment, the installation can also be done with the following command:

```
go install github.com/grafana/k6pack/cmd/k6pack@latest
```

Reference to the [k6pack Github](https://github.com/grafana/k6pack) for more information


### Usage
To bundle your test assuming that your working directory is src and test file named _smoke_
```
k6pack tests/smoke.ts -o ../dist/smoke
```

Set up enviroment variables
```
.\src\set_env.bat
```

To run test
Feel free to edit the scripts in _package.json_ as you wish
```
npm run all
```
