package com.example.pet_mating_app

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface ApiService {
    @GET("Pets/")
    fun getPets(): Call<List<Pet>>

    @GET("Pets/{id}")
    fun getPetById(@Path("id") id: Int): Call<Pet>

    @POST("Pets/")
    fun createPet(@Body pet: Pet): Call<Pet>

    @GET("Users/")
    fun getUsers(): Call<List<User>>

    @GET("Users/{id}")
    fun getUserById(@Path("id") id: Int): Call<User>

    @DELETE("Pets/{id}/")
    fun deletePet(@Path("id") id: Int): Call<Unit>

    @PUT("Pets/{id}/")
    fun updatePet(@Path("id") id: Int, @Body pet: Pet): Call<Pet>

    @POST("Messages/")
    fun sendMessage(@Body message: Message): Call<Unit>
}