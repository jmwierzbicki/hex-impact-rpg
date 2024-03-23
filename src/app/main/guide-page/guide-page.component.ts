import { Component } from '@angular/core';

@Component({
  selector: 'app-guide-page',
  templateUrl: './guide-page.component.html',
  styleUrl: './guide-page.component.scss'
})
export class GuidePageComponent {

  guide = `


# CHARACTER CREATION

ALL STEPS CAN BE CHOSEN AND APPLIED AT ANY ORDER. YOU CAN ROLL EVERYTHING AND THEN MAKE CHOICES


## STEP A: ATTRIBUTES

Attributes are basic information about every character in the game.

Choose one of the random sets of starting values of attributes. All sets have the same sum of points. Attributes with value of 6 or above are considered superhuman.

STRENGTH: physical strength, resilience and power

COORDINATION: reflexes, quickness, agility, distance attacks

PROWESS: close combat proficiency

AWARENESS: perception, insight, intuition

INTELECT: smarts, knowledge, wisdom

WILLPOWER: mental resilience and flexibility


## STEP S: SPECIALITIES

**Specialities** are bonuses to actions in a broad area, based on education and experience. Each adds +1 to any attribute roll connected to the topic. You can take same speciality multiple times and their bonus stack

You start the game with 1 free random speciality. You can get more thanks to other steps:  **Improvements**, **Origins** or **Burning**


## STEP O: ORIGINS

Origins represent broad idea how your character acquired super powers and become a hero.

Choose one of the 3 random origins. Each origins give bonuses during character creation which you can apply at any moment


## STEP I: IMPROVEMENTS

Improvements are 8 random ways you can improve your character by either adding another power to their list, increasing power’s level, adding new specialities or increasing an attribute.


## STEP P: POWER DEVELOPMENT

After calculating lvl of your power you can : \t



* decrease power level by 1 and add an extra
* increase power level by 1 and add a limit (consult with GM)
* add a limit and an extra
* Burn power to lose it and boost other powers or attributes

You can burn power to increase a level of other power by +1 as long as burned powers has equal or higher lvl

You can burn power to increase a level of one of your attributes by +1 as long as burned powers has equal or higher lvl


### USEFUL TERMS

**STAMINA**: Your characters will and ability to continue acting despite injuries. Unless stated otherwise it’s calculated :

STRENGTH **plus** WILLPOWER

**DETERMINATION**: Your characters resolve and creativity. It’s a pool used to boost your action during play in various ways. Unless stated otherwise it’s calculated :

**Six minus**



* number of natural powers
* number of device-based powers divided by 2 and rounded down.
* number of attributes with values 6+

**DEVICE**:  source of power that isn’t naturally part of your body. Can be magical, biochemical, mechanical etc. There are risks of using powered devices (can be lost, run out of power etc.) but they have less negative impact on your DETERMINATION. One device can score up to 4 powers.

**POWER TAGS**: Quick info which lets you know some facts about power without getting into too much detail. This include


    Passive: power does not require you to take any action to use it


    Attribute_used: information if an attribute is tested while using this power


    Attribute_sub: information if power lvl can be sometimes substituted for attribute test


    Action: power requires action to activate


    Repeated_action: power effect is instant and multiple uses require multiple actions


    Movement: power can be used to augment movement


    Concentration: power requires breakable concentration to maintain effect


    Reaction: power can be used outside your turn as a reaction


    Multipower: this power allows for taking many other powers as extras

**EXTRA**: Improvement of power. This can mean broader use or even getting another power connected to first. To take Extras

**LIMITS**: Limits make your power less useful, usually by limiting how, when and on what you can use them. Limits should make your power usable less often by 25-50%. Consult with your GM to choose one.


`

}
