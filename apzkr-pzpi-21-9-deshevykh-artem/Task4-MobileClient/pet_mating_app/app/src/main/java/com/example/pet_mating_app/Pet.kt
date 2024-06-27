package com.example.pet_mating_app

data class Pet(
    val id: Int?,
    val name: String,
    val species: String,
    val breed: String,
    val age: Int,
    val gender: String,
    val owner: Int?
)