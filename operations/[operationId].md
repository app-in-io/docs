---
aside: false
outline: false
---

<script setup>
import { useRoute } from 'vitepress'
const { data } = useRoute()
const operationId = data.params.operationId
</script>

<OAOperation :operationId="operationId" />
