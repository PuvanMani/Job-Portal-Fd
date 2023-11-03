export const EmployeeJSON = [
    {
        "name": "Dashboard",
        "path": "/dashboard",
        "icon": "mdi mdi-home menu-icon",
    },
    {
        "name": "Profile Details",
        "path": "/profiledetails",
        "icon": "mdi mdi-developer-board menu-icon",
        "openMenu": "ProfileToggleOpen",
        "child": [
            {
                "name": "Add Prodile",
                "path": "/profile/add-profile/create"
            },
            {
                "name": "View Profile",
                "path": "/profile/view-profile"
            }
        ]
    },
    {
        "name": "Jobs",
        "path": "/jobs",
        "icon": "mdi mdi-developer-board menu-icon",
        "openMenu": "JobToggleOpen",
        "child": [
            {
                "name": "Applied Job",
                "path": "/jobs/apllied-job"
            },
            {
                "name": "View Job",
                "path": "/jobs/view-job"
            }
        ]
    }

]
export const RecruiterJSON = [
    {
        "name": "Dashboard",
        "path": "/dashboard",
        "icon": "mdi mdi-home menu-icon",
    },
    {
        "name": "Company Profile",
        "path": "/companyprofile",
        "icon": "mdi mdi-developer-board menu-icon",
        "openMenu": "CompanyToggleOpen",
        "child": [
            {
                "name": "Add Company",
                "path": "/company/add-company"
            },
            {
                "name": "View Company",
                "path": "/company/view-company"
            }
        ]
    },
    {
        "name": "Jobs",
        "path": "/jobs",
        "icon": "mdi mdi-developer-board menu-icon",
        "openMenu": "JobToggleOpen",
        "child": [
            {
                "name": "Add Job",
                "path": "/jobs/add-job"
            },
            {
                "name": "View Job",
                "path": "/jobs/view-job"
            }
        ]
    },
    {
        "name": "Applied Canditates",
        "path": "/applied-canditates",
        "icon": "mdi mdi-home menu-icon",
    }

]
export const AdminJSON = [
    {
        "name": "Dashboard",
        "path": "/dashboard",
        "icon": "home",
    },
    // {
    //     "name": "Profile Details",
    //     "path": "/profiledetails",
    //     "icon": "mdi mdi-developer-board menu-icon",
    //     "openMenu": "ProfileToggleOpen",
    //     "child": [
    //         {
    //             "name": "Add Prodile",
    //             "path": "/profile/add-profile/create"
    //         },
    //         {
    //             "name": "View Profile",
    //             "path": "/profile/view-profile"
    //         }
    //     ]
    // },
    {
        "name": "Company Profile",
        "path": "#",
        "icon": "lan",
        "openMenu": "CompanyToggleOpen",
        "child": [
            {
                "name": "Add Company",
                "path": "/company/add-company",
                "icon": "fiber_manual_record"
            },
            {
                "name": "View Company",
                "path": "/company/view-company",
                "icon": "fiber_manual_record"
            }
        ]
    },
    {
        "name": "Jobs",
        "path": "#",
        "icon": "work",
        "openMenu": "JobToggleOpen",
        "child": [
            {
                "name": "Add Job",
                "path": "/jobs/add-job",
                "icon": "fiber_manual_record"
            },
            {
                "name": "View Job",
                "path": "/jobs/view-job",
                "icon": "fiber_manual_record"
            }
        ]
    },
    {
        "name": "Applied Canditates",
        "path": "/applied-canditates",
        "icon": "group",
    },
    {
        "name": "Recruiters",
        "path": "/list-recruiters",
        "icon": "shield_person",
    }

]