import { useUsersStore } from '../stores/usersStore';
<template>
  <div>
    <h1>个人信息</h1>
    <div>
      用户id：{{ info.id }}
    </div>
    <div>
      用户名：{{ info.username }}
    </div>
    <div>
      用户名：{{ info.passwd }}
    </div>
  </div>
</template>

<script setup>

import { useUsersStore } from '../stores/usersStore.ts'
const store = useUsersStore()
let info = store.info

</script>
