<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
const store = useAuthStore()
// User Login data
const user = computed(() => {
  return store.user
})
const route = useRoute()
const post = ref(null)
const comments = ref([])
const newComment = ref({
  name: '',
  email: '',
  body: '',
})
// Fetch Post And Related Commnets
const fetchPostDetails = async () => {
  const postId = route.params.id
  try {
    const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    post.value = postResponse.data

    const commentsResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
    )

    comments.value = commentsResponse.data.map((comment) => ({
      ...comment,
      replies: [],
      showReplyForm: false,
      replyText: '',
    }))
  } catch (err) {
    console.log('Error fetching post or comments:', err)
  }
}
// Add Comments
const addComment = async () => {
  // Check filed not Empty
  if (!newComment.value.name || !newComment.value.email || !newComment.value.body) return
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/comments', {
      name: newComment.value.name,
      email: newComment.value.email,
      body: newComment.value.body,
    })
    comments.value.push({
      ...response.data,
      replies: [],
      showReplyForm: false,
      replyText: '',
    })
    // Empty Arr
    newComment.value = { name: '', email: '', body: '' }
  } catch (err) {
    console.log('Error adding comment:', err)
  }
}
// Add Reply Fun
const addReply = (commentId) => {
  const comment = comments.value.find((c) => c.id === commentId)
  if (comment) {
    if (!comment.showReplyForm) {
      comment.showReplyForm = true
      comment.replyText = ''
    } else {
      comment.showReplyForm = false
    }
  }
}

// Save Reply
const saveReply = (commentId) => {
  const comment = comments.value.find((c) => c.id === commentId)
  if (comment && comment.replyText) {
    comment.replies = comment.replies || []
    comment.replies.push({
      id: Date.now(),
      name: user.value.name,
      body: comment.replyText,
      timestamp: new Date().toLocaleString(),
    })
    comment.replyText = ''
    comment.showReplyForm = false
  }
}

onMounted(() => {
  fetchPostDetails()
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" class="mx-auto">
        <v-card elevation="3" class="rounded-lg my-4">
          <v-card-title class="headline font-weight-bold text-capitalize"
            ><v-icon color="primary" class="mr-2">mdi-note-multiple</v-icon
            >{{ post?.title }}</v-card-title
          >
          <v-card-text class="text-body-4">{{ post?.body }}</v-card-text>
        </v-card>

        <v-card elevation="2" class="rounded-lg my-4 pa-4">
          <v-card-title class="text-h6">Add New Comment</v-card-title>
          <v-text-field
            v-model="newComment.name"
            label="Your Name"
            outlined
            dense
            class="mb-2"
          ></v-text-field>
          <v-text-field
            v-model="newComment.email"
            label="Your Email"
            outlined
            dense
            class="mb-2"
          ></v-text-field>
          <v-textarea
            v-model="newComment.body"
            label="Your Comment"
            outlined
            auto-grow
            rows="3"
            class="mb-2"
          ></v-textarea>
          <v-btn
            @click="addComment"
            color="primary"
            class="mt-3"
            :disabled="!newComment.name || !newComment.email || !newComment.body"
          >
            Send Comment
          </v-btn>
        </v-card>

        <v-card-title class="text-h5 mt-6">All Comments ({{ comments.length }})</v-card-title>

        <!-- Show Comments-->
        <div v-for="comment in comments" :key="comment.id" class="mb-4">
          <v-card class="rounded-lg" elevation="1">
            <v-card-title class="subtitle-1 font-weight-bold">{{ comment.name }}</v-card-title>
            <v-card-subtitle class="text-caption">{{ comment.email }}</v-card-subtitle>
            <v-card-text>{{ comment.body }}</v-card-text>

            <v-card-actions>
              <v-btn text small color="primary" @click="addReply(comment.id)">
                <v-icon small class="mr-1">mdi-reply</v-icon>
                {{ comment.showReplyForm ? 'Close' : 'Reply' }}
              </v-btn>
            </v-card-actions>

            <!-- Reply Form-->
            <v-expand-transition>
              <div v-if="comment.showReplyForm" class="px-4 pb-4">
                <v-textarea
                  v-model="comment.replyText"
                  label="Add your reply"
                  outlined
                  auto-grow
                  rows="2"
                  dense
                  class="mb-2"
                ></v-textarea>
                <v-btn
                  color="primary"
                  small
                  @click="saveReply(comment.id)"
                  :disabled="!comment.replyText"
                >
                  Save Reply
                </v-btn>
              </div>
            </v-expand-transition>

            <!-- Show Reply Added-->
            <div
              v-if="comment.replies && comment.replies.length > 0"
              class="pl-4 ml-4 my-3 border-l-2"
            >
              <div v-for="reply in comment.replies" :key="reply.id" class="my-3">
                <v-card flat class="rounded-lg bg-grey-lighten-4">
                  <v-card-title class="subtitle-2 font-weight-medium">{{
                    reply.name
                  }}</v-card-title>
                  <v-card-subtitle class="text-caption">
                    {{ reply.timestamp }}
                  </v-card-subtitle>
                  <v-card-text>{{ reply.body }}</v-card-text>
                </v-card>
              </div>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
