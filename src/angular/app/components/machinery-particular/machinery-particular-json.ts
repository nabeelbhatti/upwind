const ParticularMachineryParticularColumn = [
        {
            fieldName: 'file_detail.sharepoint_url',
            displayName: 'SharePoint Link',
            filter: { type: "TextBox" },
            width: '150px',
            visible: true,
            isPrimaryKey:true,
            validationRules: { "required": true },
        },
        {
            fieldName: 'mapping_object.name_mapping',
            displayName: 'MPFile Name',
            filter: { type: "TextBox" },
            width: '150px',
            visible: true,
            isPrimaryKey:true,
            validationRules: { "required": true },
        },
        {
            fieldName: 'category',
            displayName: 'Category',
            filter: { type: "CheckBox" },
            width: '150px',
            visible: true,
            isPrimaryKey:false,
            validationRules: { "required": true },
            editType: 'dropdownedit'
        },
        {
            fieldName: 'mapping_object.code_mapping',
            displayName: 'Mp Comp Name',
            filter: { type: "TextBox" },
            width: '150px',
            visible: false,
            isPrimaryKey:true
        },
        {
            fieldName: 'mapping_object.qty_mapping',
            displayName: 'MP Qty',
            filter: { type: "TextBox" },
            width: '150px',
            visible: false,
            isPrimaryKey:true
        },
        {
            fieldName: 'mapping_object.maker_mapping',
            displayName: 'Mp Maker',
            filter: { type: "TextBox" },
            width: '150px',
            visible: false,
            isPrimaryKey:true
        },
        {
            fieldName: 'mapping_object.model_mapping',
            displayName: 'Mp Model',
            filter: { type: "TextBox" },
            width: '150px',
            visible: false,
            isPrimaryKey:true
        },
        {
            fieldName: 'mapping_object.specification_mapping',
            displayName: 'Mp Specification',
            filter: { type: "TextBox" },
            width: '150px',
            visible: false,
            isPrimaryKey:true
        },
        {
            fieldName: 'mapping_object.maker_address_mapping',
            displayName: 'MP Maker Address',
            filter: { type: "TextBox" },
            width: '150px',
            visible: false,
            isPrimaryKey:true
        },
        {
            fieldName: 'start_page',
            displayName: 'Start Page',
            filter: { type: "NumericTextBox" },
            width: '150px',
            visible: false,
            isPrimaryKey:true
        },{
            fieldName: 'end_page',
            displayName: 'End Page',
            filter: { type: "NumericTextBox" },
            width: '150px',
            visible: false,
            isPrimaryKey:true
        }
    ]


    const MachineryComponentColumn = [
        {
            fieldName: 'file_detail.parent_file_name',
            displayName: 'MpFIle Name',
            filter: { type: "Checkbox" },
            width: '150px',
            visible: true,
            isPrimaryKey:true
        },
        {
            fieldName: 'mp_comp_name',
            displayName: 'Mp Compan Name',
            filter: { type: "Checkbox" },
            width: '150px',
            visible: false,
            isPrimaryKey:true
        },
        {
            fieldName: 'category',
            displayName: 'Category',
            filter: { type: "Checkbox" },
            width: '150px',
            visible: true,
            isPrimaryKey:true
        },
        {
            fieldName: 'component_object.name',
            displayName: 'Shell Component',
            filter: { type: "Checkbox" },
            width: '150px',
            visible: true,
            isPrimaryKey:true,
            validationRules: { "required": true },
        },
        {
            fieldName: 'component_object.quantity',
            displayName: 'MP Qty',
            filter: { type: "Checkbox" },
            width: '150px',
            visible: true,
            isPrimaryKey:false
        },
        {
            fieldName: 'component_object.maker_name',
            displayName: 'Mp Maker',
            filter: { type: "Checkbox" },
            width: '150px',
            visible: true,
            isPrimaryKey:false
        },
        {
            fieldName: 'component_object.model',
            displayName: 'Mp Model',
            filter: { type: "Checkbox" },
            width: '150px',
            visible: true,
            isPrimaryKey:false
        },
        {
            fieldName: 'component_object.specification',
            displayName: 'Mp Specification',
            filter: { type: "Checkbox" },
            width: '150px',
            visible: true,
            isPrimaryKey:false
        },
        {
            fieldName: 'component_object.maker_address',
            displayName: 'MP Maker Address',
            filter: { type: "Checkbox" },
            width: '150px',
            visible: true,
            isPrimaryKey:false
        },
        {
            fieldName: 'page_reference',
            displayName: 'Page Reference',
            filter: { type: "Checkbox" },
            width: '150px',
            visible: true,
            isPrimaryKey:true,
            validationRules: { "required": true },
        }
    ]

    export {
        ParticularMachineryParticularColumn,
        MachineryComponentColumn
    }