import 'package:mobile/api/fetchParticipants.dart';
import 'package:mobile/types/Participant.dart';
import 'package:provider/provider.dart';

import '../screens/ParticipantDetails.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class PeoplePage extends StatelessWidget {
  const PeoplePage({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Participant>>(
      future: fetchParticipants(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          print("FutureBuilder is waiting");
          return Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          print("FutureBuilder has error: ${snapshot.error}");
          return Center(child: Text('Error: ${snapshot.error}'));
        } else {
          return ListView.builder(
            itemCount: snapshot.data!.length,
            itemBuilder: (context, index) {
              final participant = snapshot.data![index];
              print(index);
              return GestureDetector(
                onTap: () => showDialog(
                  context: context,
                  builder: (context) => ParticipantDetails(Key(index.toString()), participant),
                ),
                child: Card(
                  child: ListTile(
                    title: Text(
                      participant.name,
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    trailing: Text("See more..."),
                  ),
                ),
              );
            },
          );
        }
      },
    );
  }
}
