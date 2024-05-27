import 'package:flutter/material.dart';
import 'package:mobile/api/fetchParticipants.dart';
import 'package:mobile/types/Participant.dart';

class ParticipantDetails extends StatelessWidget {
  final Participant participant;

  const ParticipantDetails(this.participant);

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      surfaceTintColor: Colors.white,
      title: Column(
        children: [
          ClipOval(
            child: Image.asset(
              'assets/side_eye_monkey.png',
              height: 80,
            ),
          ),
          SizedBox(
            height: 10,
          ),
          Text(
            participant.name,
            textAlign: TextAlign.center,
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
        ],
      ),
      content: IntrinsicHeight(
        child: Column(
          children: [
            const Text(
              "Email:",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            Text(participant.email),
            const SizedBox(
              height: 10,
            ),
            const Text(
              "Academic background:",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            Text(participant.academicBackground),
            const SizedBox(
              height: 10,
            ),
            const Text(
              "Skils:",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            ...participant.skills.map((skill) => Text(skill)),
            const SizedBox(
              height: 10,
            ),
            const Text(
              "Interests:",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            ...participant.skills.map((interest) => Text(interest)),
          ],
        ),
      ),
    );
  }
}
