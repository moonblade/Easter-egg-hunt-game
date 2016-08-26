#!/usr/bin/env python
with open("secretRoom") as file:
	linum=0
	for line in file:
		linum+=1
		power=1
		total=0
		required = '{:<8}'.format(line.rstrip()).replace(' ','0').replace('x','1')
		print("       .byte $"+'{:02x}'.format(int(required,2)).upper()+"                  ;"+'{:<8}'.format(line.rstrip()))
		if linum>=96:
			break
	while linum<96:
		print("       .byte $00"+"                  ;")
		linum+=1
