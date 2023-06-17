<a name="readme-top">
</a>
<br />

<div align="center">
  <a href="https://github.com/ilyesOussama/create-lens-dapp">
    Logo
  </a>

<h3 align="center">Create-Lens-Dapp</h3>

<p align="center">
	The fastest way to get you up and running building on top of Lens protocol!
    <br />
    <br />
    <a href="https://create-lens-dapp.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/ilyesOussama/create-lens-dapp/issues">Report Bug</a>
    ·
    <a href="https://github.com/ilyesOussama/create-lens-dapp/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

### Built With

* [Next.js](https://nextjs.org/)
* [Lens SDK](https://github.com/lens-protocol/lens-sdk)
* [Shadcn/ui](https://ui.shadcn.com)

## Usage
you can use this repository as a template.

```
git clone https://github.com/user-name/repository-name
cd repository-name
pnpm i
```

```
.env.local
NODE_ENV=""
BNDLR_KEY=""
```

#### Auth

```
import  LoginButton  from  "@/components/auth/LoginButton";
<LoginButton />
```

#### Publication

```
<Publications profileId={profileId} />
<Publication publicationId={publicationId} />
```

#### Profile

```
<Profile profileId={profileId} />
<Profile handle={handle} />
<ProfileAvatar profileId={profileId}/>
<ProfileBio profile={profileprofile}>
```

#### Create

```
<CreatePost publisher={publisher} />
<CreateComment publicationId={publicationId} publisher={publisher} />
```

#### Search

```
<SearchPublications  query={query} />
<SearchProfiles  query={query} />
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
