import { h } from 'vue';
import { DashboardTwotone, ApiRound, ColorLensTwotone } from '@vicons/material'

export default [
    {
        title: "USAGE",
        type: "subtitle",
    },
    {
        title: "Style & Colors",
        icon: () => h(ColorLensTwotone),
        children: [
            {
                title: "Colors",
                to: '/colors'
            },
            {
                title: "Helper Class",
                to: '/class',
            },
        ]
    },
    {
        title: "Components",
        icon: () => h(DashboardTwotone),
        expanded: true,
        children: [
            {
                title: "Button",
                to: '/button',
            },
            {
                title: "Container",
                to: '/container'
            },
            {
                title: "Dialog",
                to: '/dialog'
            },
            {
                title: "Form",
                to: '/form',
                children: [
                    {
                        title: "Checkbox",
                        to: '/checkbox'
                    },{
                        title: "Input",
                        to: '/input'
                    },{
                        title: "Radio",
                        to: '/radio'
                    },
                ]
            },{
                title: "Icon",
                to: '/icon'
            },
            {
                title: 'Message',
                to: '/message'
            },
            {
                title: "Popup",
                to: '/popup'
            }
        ],
    },
    {
        title: "Directives",
        icon: () => h(ApiRound),
        children: [{
            title: 'Ripple',
            to: '/ripple'
        }]
    },
]