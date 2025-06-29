<template>
    <div class="create-ticket-card">
        <div class="upper-section">
             <h3> {{ticket.name}} </h3>
            <p> End In {{ticket.endDate}} | {{ticket.endTime}} </p>
        </div>
        <hr>
        <div class="lower-section">
            <h4> {{ticket.price}} </h4>
            <div class="buttons-wrapper">
                <button class="create-ticket-card-icon" >
                    <PencilIcon :style="{ width: '32px', height: '32px'}" />
                </button>
                <button class="create-ticket-card-icon" >
                    <TrashIcon :style="{ width: '32px', height: '32px'}" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { PencilIcon } from '@heroicons/vue/24/solid'
import { TrashIcon } from '@heroicons/vue/24/solid'

export default {
    name: "CreateTicketCard",
    props: {
        ticket: Object
    },
    components : {
        PencilIcon,
        TrashIcon
    }
}
</script>

