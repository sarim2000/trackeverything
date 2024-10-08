/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/

// This file was generated by BAML: do not edit it. Instead, edit the BAML
// files and re-generate this code.
//
// tslint:disable
// @ts-nocheck
// biome-ignore format: autogenerated code
/* eslint-disable */
import { Image } from "@boundaryml/baml"
export interface AISuggestions {
  title: string
  author: string
  description: string
  reason: string
  
}

export interface MoodBased {
  mood: string
  media_type: string
  
}

export interface UserProfile {
  bio: string
  age_range: string
  favorite_genre: string[]
  preferred_media: string[]
  language: string
  
}
