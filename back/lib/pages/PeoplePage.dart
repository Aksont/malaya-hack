import 'package:back/screens/PersonDetails.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class PeoplePage extends StatelessWidget {
  const PeoplePage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        GestureDetector(
          onTap: () => showBottomSheet(
            context: context,
            builder: (context) => PersonDetails(),
          ),
          child: const Card(
            child: ListTile(
              title: Text(
                'Person name',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
