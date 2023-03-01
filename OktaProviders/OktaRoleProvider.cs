// Install Okta.Core via the "Okta SDK" which is available on NuGet
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
        public override void CreateRole