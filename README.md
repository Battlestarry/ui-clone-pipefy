
<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. Introduction</a></li>
<li><a href="#sec-2">2. Setup and Configuration</a></li>
<li><a href="#sec-3">3. MVC 4 Music Store</a></li>
<li><a href="#sec-4">4. Setting up Okta</a></li>
<li><a href="#sec-5">5. Using Okta to authenticate your Music Store users</a></li>
<li><a href="#sec-6">6. Accessing Okta user profile data from the Music Store</a></li>
<li><a href="#sec-7">7. Managing your users and groups from inside the Music Store</a></li>
<li><a href="#sec-8">8. Set up contextual navigation links to the Music Store</a></li>
<li><a href="#sec-9">9. <i>Optional:</i> Adding Single-sign on to your Music Store</a></li>
<li><a href="#sec-10">10. Closing</a></li>
</ul>
</div>
</div>



# Introduction<a id="sec-1" name="sec-1"></a>

This project is a demonstration of how to add Okta as an identity
provider for an existing application. 

Rather than concoct an example, I wanted to use an
existing sample application that more accurately represents what a
real-world application would look like. To that end, the sample
application that I selected is the [MVC Music Store](https://mvcmusicstore.codeplex.com/), which you're
probably familiar with if you're a .NET developer.

The MVC Music Store is a sample application that is also an
introduction to the [open source](https://www.asp.net/open-source) [ASP.NET web application framework](https://www.asp.net/). 

In this document, I will show you how to modify a completed
MVC Music Store application to use Okta for login, registration,
Single Sign-on, as well as user and group management.

I suggest following this document from beginning to end, as each
section builds upon the last. 

# Setup and Configuration<a id="sec-2" name="sec-2"></a>

Before you get started, you'll need to install or set up the
software and services below:

1.  Download and install [Visual Studio Express 2013 for Web](http://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx).
    
    At the time that I write this (November 2014), this is the most
    recent version of Visual Studio available.
2.  Sign up for [Okta Developer Edition](http://developer.okta.com/).
    
    You'll need an Okta "organization" of your own to use as you follow
    this gude.
3.  *Optional:* Sign up for a [30 day free trial of Zendesk](https://www.zendesk.com/register).
    
    This isn't strictly required. If you want to see how Okta enables you
    to seamlessly integrate 3rd party applications, then I
    suggest signing up for Zendesk, which is the application I use to
    demonstrate seamless single sign-on in this guide.
4.  *Optional:* Sign up for a [free trial of Microsoft Azure](http://azure.microsoft.com/en-us/pricing/free-trial/).
    
    This isn't required either. This guide assumes that you'll be
    following along using Visual Studio on your personal
    computer. However, if you want to host your code somewhere
    public-facing, then Azure is the easiest place to do that.

# MVC 4 Music Store<a id="sec-3" name="sec-3"></a>

This project builds upon the excellent MVC Music Store
application. *However* this in this example I use "Visual Studio
Express 2013 for Web" and ASP.NET MVC 4, *not* "Visual Web Developer 2010
Express SP1" and ASP.NET MVC 3 as is used in the MVC Music Store
example. At the time that I write this (November 2014), Visual
Studio Express 2013 for Web is the most recent freely available
version of Visual Studio Express.

Although they were written for MVC 3, the MVC Music Store
instructions still work with MVC 4, with a few key differences:

-   **Your project must be created with the ASP.NET MVC 4 "Internet"
    project template**. Not the "Empty" project template as the MVC
    Music Store instructions suggest for MVC 3.
-   MVC 4 no longer has the built-in "ASP.NET Configuration
    website", so you'll need to create the users and groups mentioned
    in "Part 7: Membership and Authorization" using a different
    technique.
-   You will need to add a <code>[InitializeSimpleMembership]</code> attribute
    after the <code>[Authorize(Roles = "Administrator")]</code> attribute
    mentioned in "Part 7: Membership and Authorization".

I cover these differences in more detail in the section below.

## Building the MVC Music Store<a id="sec-3-1" name="sec-3-1"></a>

Here is how to get set up on your own computer with Visual Studio
Express 2013 for Web and a working version of the MVC Music Store
for MVC 4:

1.  Download and install [Visual Studio Express 2013 for Web](http://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx).
2.  Except for the changes listed below, follow the [MVC 3 Music Store](http://www.asp.net/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-1)
          instructions.
3.  If you don't want to spend the time to go through the MVC 3 Music
    Store instructions, a completed version of the project is
    included with this project.

## Things to do differently when building the MVC Music Store for ASP.NET MVC 4<a id="sec-3-2" name="sec-3-2"></a>

Here are the things that you'll need to do differently when
building the MVC Music Store for MVC 4. The changes you'll need to
make are grouped according to the part of the MVC Music Store
instructions where you'll need to make the changes.

### Changes needed in [Part 1: Overview and File→New Project](http://www.asp.net/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-1)<a id="sec-3-2-1" name="sec-3-2-1"></a>

This is the very first part of the MVC Music Store instructions, they
cover what you'll be doing and how to get started. You'll need to
make the following changes in this part of the instructions:

1.  In the section named "Installing the software":

    -   You will be downloading [Visual Studio Express 2013 for Web](http://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx) instead of the tools listed in this section.

2.  In the section named "Creating a new ASP.NET MVC 3 project":

    -   You will be creating an "ASP.NET MVC 4 Web Application" project. I use the name
        "Mvc4MusicStore" in this document, but you can name your project
        whatever you want.
    -   **Very important: You must select "Internet Application" as the project
        template** for your application. 
        <br />
        You'll run into issues in Part 7 if you don't!
        <br />
        
        ![img](./Documentation/Images/new-mvc4-project.png "Creating a new ASP.NET MVC 4 Project with the "Internet Application" template selected")

### Changes needed in [Part 7: Membership and Authorization](http://www.asp.net/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-7)<a id="sec-3-2-2" name="sec-3-2-2"></a>

This part of MVC Music Store instructions cover adding users and groups
to the Music Store. This is the part of the instructions that change the
most with MVC 4. You will run into a lot of issues here if you did
not select "Internet" as the project template for your
application!

The major difference here is that you'll need to create your user
and "Administrator" group using different methods than are described in the MVC 3
Music Store instructions. The details for creating your user and
"Administrator" group are below:

1.  In the section named "Adding an Administrative User with the ASP.NET Configuration site":

    Instead of creating a user with the ASP.NET Configuration
    website, you'll be creating a user directly from the Music Store
    application.
    
    **Creating the "admin@example.com" user:**
    
    -   Run the code for your project and navigate to
        <code>/Account/Register</code>
    -   Create a user using the webpage at
        <code>/Account/Register</code>. I suggest using the
        same values suggested by the instructions, username: "admin@example.com",
        password: "password123!"
    
    **Manually adding the "Administrator" group:**
    
    -   From the "View" menu, select "Server Explorer"
    -   Expand the "Default Connections" section
    -   Expand "DefaultConnection"
    -   Expand "Tables"
    -   Right Click on "UserProfile", select "Show Table Data"
    -   In the "dbo.UserProfile [Data]" window that opens up, make sure that the "UserId" is "1"
        for the "UserName" of "admin@example.com"
         <br />
        ![img](./Documentation/Images/UserProfile-Data.png)
    -   In the "Server Explorer", right-click on "webpages\_Roles" and 
        select "Show Table Data"
    -   In the "dbo.webpages\_Roles [Data]" window that opens, up for
        Click on box that contains "*NULL*" in the "RoleName" column,
        type "Administrator" into that box.
         <br />
        ![img](./Documentation/Images/webpages_Roles-Data.png)
    -   In the "Server Explorer", right-click on
        "webpages\_UsersInRoles", and select select "Show Table Data"
    -   In the "dbo.webpages\_UsersInRoles [Data]" window that opens up,
        enter "1" into both the UserId and RoleId columns.
        <br />
        ![img](./Documentation/Images/webpages_UsersInRoles-Data.png)

2.  In the section named "Role-based Authorization":

    You'll only need to make two small changes in this section. In
    the *StoreManagerController.cs* file:
    
    -   Add <code>using Mvc4MusicStore.Filters;</code> to the top of
        the file.
    -   Add <code>[InitializeSimpleMembership]</code> under the
        <code>[Authorize(Roles = "Administrator")]</code> line.
        <br />
        ![img](./Documentation/Images/StoreManagerController-updated.png)

# Setting up Okta<a id="sec-4" name="sec-4"></a>

At this point, you should have your very own Music Store written in
MVC 4. 

In the sections that follow, I will show you how to use Okta as the
identity store for the users and groups in the Music Store, how you
can read extended Okta user properties from the Music Store, how you
can manage your users and groups from inside of the Music Store, and
how to add Single sign-on functionality to your Music Store using
Okta.

Before we get started, you'll need to do a few things in the Okta
organization that you created previously (if you haven't signed up
for the [Okta Developer Edition](http://developer.okta.com/) yet, you need to do that now).

Here's what you'll need to do:

1.  Log in as the administrator user for your Okta account and
    access your [Okta Administrator Dashboard](https://support.okta.com/entries/27416107-What-Can-I-Do-as-an-Administrator-).
2.  [Create a new Okta group](https://support.okta.com/entries/27340138-Using-the-Okta-People-Page#Groups) called "Administrator".
3.  Add your administrator user to the "Administrator" group.
4.  [Get an Okta API token](http://developer.okta.com/docs/getting_started/getting_a_token.html) for your Okta organization. Copy this
    token somewhere as you'll be using it soon.

# Using Okta to authenticate your Music Store users<a id="sec-5" name="sec-5"></a>

Now that you've finished setting up your Okta organization, we're
ready to start integrating Okta into your Music Store.

We'll be starting off by adding Okta as a "drop-in" replacement for user
authentication and authorization management. This is done by
implementing the Membership and Role providers in ASP.NET.

By integrating Okta via the ASP.NET Membership and Role providers,
a lot of template code in our application will "just work", for
example: user registration, user authorization, and changing passwords.

Adding the Okta Membership and Role providers will lay the
foundation that we'll build on in the rest of this guide.

**These are the steps you'll need to take to add Okta to your Music Store:**

1.  Install the Okta Providers project into your solution.
    -   Download the code to the [Okta Music Store](https://github.com/okta/okta-music-store).
    -   Copy the entire "OktaProviders" sub-folder from
        Mvc4MusicStore folder the Okta Music Store code to
        the base folder of your Mvc4MusicStore project.
    -   In the Solution Explorer window, right-click on the
        line that says "Solution 'Mvc4MusicStore'".
    -   Select "Add", then "Existing Project&#x2026;", select the
        OktaProviders folder your just copied, then select the
        "OktaProviders.csproj" file in that folder.
2.  Add a reference to the OktaProviders project.
    -   In Solution Explorer window, expand the "Mvc4MusicStore"
        project, and right-click on "References".
    -   Select "Add Reference&#x2026;"
    -   Click on "Solution" on the left side of the window.
    -   Click on the checkbox next to "OktaProviders".
    -   Click the "OK" button.
3.  Add the Okta SDK to the Mvc4MusicStore project from NuGet.
    -   Right click on the Mvc4MusicStore in your Solution Explorer
        window and select "Manage NuGet Packages&#x2026;"
    -   Click on "Online" on the left side of the window.
    -   Include Prerelease packages by changing the drop-down menu
        that says "Stable Only" to "Include Prerelease".
    -   Use the search box on the right of the window to search for
        "Okta".
    -   When you see the "Okta SDK" package, click on the "Install"
        button for that package.
    -   When the Okta SDK installation completes, click the "Close"
        button on the "Manage NuGet Packages" window.
4.  Add the Okta SDK to the OktaProviders project from NuGet.
    -   Follow the same steps above, but for the "OktaProviders" project.
5.  Edit the "Web.config" file in the Mvc4MusicStore project.
    Add the XML below inside of the
    <code>&lt;appSettings&gt;</code> tag.<br/>
    Make sure that you set the "okta:ApiToken" to the API token
    that you generated in "Setting up Okta" section and that you
    replace the "okta:ApiUrl" with the URL to your Okta
    organization.
    
    ```xml
    <add key="okta:ApiToken" value="01Abcd2efGHIjKl3m4NoPQrstu5vwxYZ_AbcdefGHi" />
    <add key="okta:ApiUrl" value="https://example.okta.com" />
    ```
    
    **Remember to use real values for the okta:ApiToken and the
    okta:ApiUrl!**
    
    Add the following inside of the <code>&lt;system.web&gt;</code> tag:<br/>
    
    ```xml
    <membership defaultProvider="SimpleMembershipProvider">
      <providers>
        <add name="SimpleMembershipProvider" type="OktaProviders.OktaMembershipProvider, OktaProviders" />
      </providers>
    </membership>
    <roleManager enabled="true" defaultProvider="SimpleRoleProvider">
      <providers>
        <add name="SimpleRoleProvider" type="OktaProviders.OktaRoleProvider, OktaProviders" />
      </providers>
    </roleManager>
    ```

**Try it out: Log in to the Music Store using Okta**


1.  Start the Music Store from Visual Studio using the "Play" button
    or by selecting the "DEBUG" menu and selecting "Start Debugging".
2.  Add "/Account/Create" to the end of the "localhost" URL in
    Internet Explorer. You should see a "Register" page similar to
    the one depicted below.
3.  Create a new user, for example: "alice@example.com". Note that
    Okta has different password requirements than the Music Store
    defaults. Your password will require at least one upper-case
    letter. I suggest using: "Password123!".
    <br/>
    ![img](./Documentation/Images/Account-Register-alice.png)
4.  If everything works, you will see the normal Music Store
    homepage.

**If you get an error**

If you *don't* see the normal Music Store homepage, but instead see
a something like the image below, it probably means that you
forgot to configure the "okta:ApiToken" or "okta:ApiUrl" settings
in your "Web.config" file.

![img](./Documentation/Images/SimpleMembershipProvider-Configuration-Error.png)

**Seeing what the code is doing**

If you want to see how things are working in the code. 
Set a breakpoint on the
<code>var createdUser = okta.users.Add(userProfile);</code> line in
the "OktaMembershipProvider.cs" file located in the OktaProviders
project. (You can set a breakpoint in Visual Studio by clicking in
the left margin of the line where you want to set the
breakpoint, in the area where you see the red dot in the image
below)

![img](./Documentation/Images/OktaMembershipProvider-CreateUserAndAccount-breakpoint.png)

Once you've set that breakpoint, follow the steps in the "Log in to
the Music Store with Okta" section above. This time, when you click
the "Register" button, you'll be taken into Visual Studio once your
breakpoint is reached. Once you get to the breakpoint, step through
the code by pressing the "Step Into" button
![img](./Documentation/Images/Step-Into-Button.png) in the Visual Studio toolbar.

# Accessing Okta user profile data from the Music Store<a id="sec-6" name="sec-6"></a>

In the previous section, we integrated Okta into the Music Store and
tested the integration by logging in to the Music Store with an Okta
account. 

In this section I will show you how to make use of the
additional user attributes that Okta stores for every user.

The [default Okta user profile object](http://developer.okta.com/docs/api/rest/users.html#profile-object) stores the following
attributes: "login", "email", "firstName", "lastName", and
"mobilePhone". Thanks to the features of the Okta
[Universal Directory](https://www.okta.com/product/universal-directory.html), you can also extend the user profile for the
users in your Okta organization to support your own
organziation-specific custom attributes.

At a high level, here is what we'll need to do to enable the Music
Store to make use of the "firstName", "lastName", and "mobilePhone"
user attributes that Okta stores by default:

-   Extend the [MembershipUser](http://msdn.microsoft.com/en-us/library/system.web.security.membershipuser%28v=vs.100%29.aspx) class to store those additional
    attributes.
-   Write our own implementation of the [IIdentity](http://msdn.microsoft.com/en-us/library/system.security.principal.iidentity%28v=vs.110%29.aspx) interface that is
    also aware of the additional attributes.
-   Make our implementation of the IIdentity interface available to
    the to the rest of our code in "[HttpContext.Current.User](http://msdn.microsoft.com/en-us/library/system.web.httpcontext.user%28v=vs.110%29.aspx)"
    by handling the "AuthenticateRequest" event in the [ASP.NET Application Life Cycle](http://msdn.microsoft.com/en-us/library/ms178473%28v=vs.80%29.aspx). This is done by writing our own
    "[Application\_AuthenticateRequest](http://smehrozalam.wordpress.com/2009/01/01/using-customprincipal-with-forms-authentication-in-aspnet/)" method.
-   Fix an issue with the template code in the Account controller that
    conflicts with the Okta membership provider.
-   Update the "Account/Manage.cshtml" view to display these
    additional attributes.
-   Require users to enter in their first name, last name, and phone
    number when they register for the Music Store.

You will not need to write the MembershipUser class or the implementation of the
IIdentity interface because they are already part of the
OktaProviders project we added to the Music Store in the previous
section. The extended MembershipProvider class is called
"OktaMembershipUser" and the implementation of the IIdentity
interface is called "OktaIdentity".

With that code out of your way, here is how to give your Music Store
code access to the extra Okta user profile attributes:

**Handling the AuthenticateRequest event**

In order to give the rest of the Music Store code access to the
additional Okta use profile attributes, we need to change the type
of the user object that MVC uses to represent users.

To do this, we will write a handler for the AuthenticateRequest
event that will create a new OktaIdentity object and store it in
"HttpContext.Current.User".

We make this change by updating the the "Global.asax.cs" file as
follows:

Add <code>using OktaProviders;</code> and <code>using
System.Web.Security;</code> to the top of the file with the other
"using" statements.

Add this method to the "MvcApplication" class in the file:

```csharp
protected void Application_AuthenticateRequest(object sender, EventArgs e)
{
    if (Request.IsAuthenticated)
    {
        string loggedUser = HttpContext.Current.User.Identity.Name;
        var memberUser = (OktaMembershipUser)Membership.GetUser(loggedUser);
        var roles = Roles.GetRolesForUser(loggedUser);
        var identity = new OktaIdentity(memberUser.UserName, true)
        {
            FirstName = memberUser.FirstName,
            LastName = memberUser.LastName,
            PhoneNumber = memberUser.PhoneNumber,
            Apps = memberUser.apps,
        };
        var principal = new System.Security.Principal.GenericPrincipal(identity, roles);
        HttpContext.Current.User = principal;
    }
}
```

Here is what these changes should look like in Visual Studio:

![img](./Documentation/Images/Global-asax-cs-AuthenticateRequest.png)

**Updating the Account controller**

The first change that needs to be made is the the Account controller
("AccountController.cs"). We need to add <code>using
OktaProviders;</code> to the top of the file with the other
"using" statements.

Next, we need to remove all references to the
"OAuthWebSecurity.HasLocalAccount" method from the Account
controller. (This is because Okta uses strings to uniquely identify
users and the "[WebSecurity.GetUserId](https://github.com/ASP-NET-MVC/aspnetwebstack/blob/256968e02c713ab04b3c34c1edca957625c29c5f/src/WebMatrix.WebData/WebSecurity.cs#L364)" method presumes that all
MembershipUser objects are identified by integers).

Here are the changes you'll need to make:

1.  In the <code>public ActionResult Disassociate(string provider, string providerUserId)</code> method:<br />
    Change:<br/>
    
    ```csharp
    bool hasLocalAccount = OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
    ```
    
    to:<br/>
    
    ```csharp
    bool hasLocalAccount = true;
    ```
2.  In the <code>public ActionResult Manage(ManageMessageId? message)</code> method:<br/>
    Change:<br/>
    
    ```csharp
    ViewBag.HasLocalPassword = OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
    ```
    
    to:<br/>
    
    ```csharp
    ViewBag.HasLocalPassword = true;
    ```
3.  In the <code>public ActionResult Manage(LocalPasswordModel model)</code> method:<br/>
    Change:<br/>
    
    ```csharp
    bool hasLocalAccount = OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
    ```
    
    to:<br/>
    
    ```csharp
    bool hasLocalAccount = true;
    ```
4.  In the <code>public ActionResult RemoveExternalLogins()</code> method:<br/>
    Change:<br/>
    
    ```csharp
    ViewBag.ShowRemoveButton = externalLogins.Count > 1 || OAuthWebSecurity.HasLocalAccount(WebSecurity.GetUserId(User.Identity.Name));
    ```
    
    to:<br/>
    
    ```csharp
    ViewBag.ShowRemoveButton = externalLogins.Count > 1;
    ```

**Updating the Account/Manage view**

Now that we added the handler for the AuthenticateRequest event and
made the changes to the Account controller template code, we can
update the Manage view for the Account controoler to show the extra
attributes from the Okta user profile.

To this, you just need to update the "Views/Account/Manage.cshtml"
file as follows:

Directly underneath this line:

```xml
<p>You're logged in as <strong>@User.Identity.Name</strong>.</p>
```

Add these lines:

```xml
<p>First Name: <strong>@(((OktaProviders.OktaIdentity)User.Identity).FirstName)</strong></p>
<p>Last Name: <strong>@(((OktaProviders.OktaIdentity)User.Identity).LastName)</strong></p>
<p>Phone Number: <strong>@(((OktaProviders.OktaIdentity)User.Identity).PhoneNumber)</strong></p>
```

Here is what it should look like in Visual Studio:
![img](./Documentation/Images/Manage-cshtml.png)

**Try it out: See the extra Okta user profile data in the Music Store**

1.  Start the Music Store from Visual Studio using the "Play" button
    or by selecting the "DEBUG" menu and selecting "Start Debugging".
2.  Add "/Account/Login" to the end of the "localhost" URL in
    Internet Explorer. You should see a "Login" page similar to
    the one depicted below.
    ![img](./Documentation/Images/Log-in-Form.png)
3.  Log in using the user you orignally used to sign in to configure
    your Okta organization.
4.  Once you are logged in, add "/Account/Manage" to the end of the
    "localhost" URL in Internet Explorer.
5.  If everything works, you will see a page that looks like the one
    below.
    ![img](./Documentation/Images/Manage-Account-with-attributes.png)

**Adding extra user profile attributes to the Registration view**

Now that you've verified that you can see access Okta user
profile attributes from the Music Store, the last step in this
section is to update the Registration page to accept some of those
extra user profile attributes. To do this, we'll need to update the
RegisterModel for accounts and update the Register view for the
Account controller.

To update the RegisterModel for accounts, open the
"Models/AccountModel.cs" file and add the following to the
"RegisterModel" class:

```xml
[Required]
[Display(Name = "First Name")]
public string FirstName { get; set; }

[Required]
[Display(Name = "Last Name")]
public string LastName { get; set; }

[Required]
[Display(Name = "Phone Number")]
public string PhoneNumber { get; set; }

```

It should look like this:

![img](./Documentation/Images/RegisterModel-updated.png)

Lastly, to update the Register view, open the
"Views/Account/Register.cshtml" file and add the following just
after the closing "<li>" tag for the UserName:
\`\`\`xml
<li>
    @Html.LabelFor(m => m.FirstName)
    @Html.TextBoxFor(m => m.FirstName)
</li>
<li>
    @Html.LabelFor(m => m.LastName)
    @Html.TextBoxFor(m => m.LastName)
</li>
<li>
    @Html.LabelFor(m => m.PhoneNumber)