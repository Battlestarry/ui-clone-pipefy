﻿// Install Okta.Core via the "Okta SDK" which is available on NuGet
using Okta.Core;
using Okta.Core.Clients;
using Okta.Core.Models;
using System;
using System.Collections.Generic;
using System.Configuration.Provider; // For the ProviderException thrown by DeleteRole
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using WebMatrix.WebData;

namespace OktaProviders
{
    /// <summary>
    /// Extends SimpleRoleProvider and redirects all calls into OktaIndependentRoleProvider
    /// </summary>
    public class OktaRoleProvider : SimpleRoleProvider
    {
        private OktaIndependentRoleProvider redirect;
        public OktaRoleProvider()
        {
            redirect = new OktaIndependentRoleProvider();
        }
        public override string[] GetRolesForUser(string username)
        {
            return redirect.GetRolesForUser(username);
        }
        public override void CreateRole(string roleName)
        {
            redirect.CreateRole(roleName);
        }
        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            return redirect.DeleteRole(roleName, throwOnPopulatedRole);
        }
        public override string[] GetUsersInRole(string roleName)
        {
            return redirect.GetUsersInRole(roleName);
        }
        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            redirect.AddUsersToRoles(usernames, roleNames);
        }
        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            redirect.RemoveUsersFromRoles(usernames, roleNames);
        }
        public override string[] GetAllRoles()
        {
            return redirect.GetAllRoles();
        }
        public override bool IsUserInRole(string username, string roleName)
        {
            ret