/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
	aws_project_region: "ap-southeast-1",
	aws_cognito_identity_pool_id:
		"ap-southeast-1:63246a90-a7b4-4419-b5db-92f4537e88cd",
	aws_cognito_region: "ap-southeast-1",
	aws_user_pools_id: "ap-southeast-1_Mhb1BARMw",
	aws_user_pools_web_client_id: "6clkotpv38k1l7pc6hi8563q1g",
	oauth: {
		domain:
			"maylubakba5f9f6a3c-5f9f6a3c-dev.auth.ap-southeast-1.amazoncognito.com",
		scope: [
			"phone",
			"email",
			"openid",
			"profile",
			"aws.cognito.signin.user.admin",
		],
		redirectSignIn: "https://main.d2stb3db6oi06i.amplifyapp.com",
		redirectSignOut: "https://main.d2stb3db6oi06i.amplifyapp.com",
		responseType: "code",
	},
	federationTarget: "COGNITO_USER_POOLS",
	aws_cognito_username_attributes: ["EMAIL"],
	aws_cognito_social_providers: ["GOOGLE"],
	aws_cognito_signup_attributes: ["EMAIL"],
	aws_cognito_mfa_configuration: "OFF",
	aws_cognito_mfa_types: ["SMS"],
	aws_cognito_password_protection_settings: {
		passwordPolicyMinLength: 8,
		passwordPolicyCharacters: [],
	},
	aws_cognito_verification_mechanisms: ["EMAIL"],
};

export default awsmobile;
