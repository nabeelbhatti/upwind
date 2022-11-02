const ViewColumnData = [
    {
        fieldName: 'component_object.name',
        displayName: 'Shell Component',
        filter: { type: "Checkbox" },
        width: '150px',
        visible: true,
        isPrimaryKey:true,
        // validationRules: { "required": true },
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
        fieldName: 'component_object.page_reference',
        displayName: 'Page Reference',
        filter: { type: "Checkbox" },
        width: '150px',
        visible: true,
        isPrimaryKey:true,
        // validationRules: { "required": true },
    }
]


export {
    ViewColumnData
}